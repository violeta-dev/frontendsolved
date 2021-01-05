import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  TAGS_LOAD_REQUEST,
  TAGS_LOAD_SUCCESS,
  TAGS_LOAD_FAILURE,
  ADVERTS_LOAD_REQUEST,
  ADVERTS_LOAD_SUCCESS,
  ADVERTS_LOAD_FAILURE,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_DELETE_FAILURE,
  ADVERT_LOAD_REQUEST,
  ADVERT_LOAD_SUCCESS,
  ADVERT_LOAD_FAILURE,
  UI_RESET_ERROR,
} from './types';
import { getTags, getAdvert } from './selectors';

const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const login = (credentials, location) => async (
  dispatch,
  _getState,
  { api, history },
) => {
  dispatch(authLoginRequest());
  try {
    await api.auth.login(credentials);
    dispatch(authLoginSuccess());
    // Navigate to previously required route
    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  } catch (error) {
    dispatch(authLoginFailure(error));
  }
};

export const logout = () => async (dispatch, _getState, { api, history }) => {
  await api.auth.logout();
  dispatch(authLogout());
  history.push('/login');
};

const tagsLoadRequest = () => ({
  type: TAGS_LOAD_REQUEST,
});

const tagsLoadSuccess = tags => ({
  type: TAGS_LOAD_SUCCESS,
  payload: tags,
});

const tagsLoadFailure = error => ({
  type: TAGS_LOAD_FAILURE,
  error: true,
  payload: error,
});

export const loadTags = () => async (dispatch, getState, { api }) => {
  // Avoid re-fetch tags
  const tags = getTags(getState());
  if (tags.length) {
    return;
  }
  dispatch(tagsLoadRequest());
  try {
    const tags = await api.adverts.getTags();
    dispatch(tagsLoadSuccess(tags));
  } catch (error) {
    dispatch(tagsLoadFailure(error));
  }
};

const advertsLoadRequest = () => ({
  type: ADVERTS_LOAD_REQUEST,
});

const advertsLoadSuccess = adverts => ({
  type: ADVERTS_LOAD_SUCCESS,
  payload: adverts,
});

const advertsLoadFailure = error => ({
  type: ADVERTS_LOAD_FAILURE,
  error: true,
  payload: error,
});

export const loadAdverts = filters => async (dispatch, _getState, { api }) => {
  dispatch(advertsLoadRequest());
  try {
    const adverts = await api.adverts.getAdverts(filters);
    dispatch(advertsLoadSuccess(adverts));
  } catch (error) {
    dispatch(advertsLoadFailure(error));
  }
};

const advertLoadRequest = () => ({
  type: ADVERT_LOAD_REQUEST,
});

const advertLoadSuccess = advert => ({
  type: ADVERT_LOAD_SUCCESS,
  payload: advert,
});

const advertLoadFailure = error => ({
  type: ADVERT_LOAD_FAILURE,
  error: true,
  payload: error,
});

export const loadAdvert = id => async (dispatch, getState, { api }) => {
  // Avoid re-fetch advert
  const advert = getAdvert(id)(getState());
  if (advert) {
    return;
  }
  dispatch(advertLoadRequest());
  try {
    const advert = await api.adverts.getAdvert(id);
    dispatch(advertLoadSuccess(advert));
  } catch (error) {
    dispatch(advertLoadFailure(error));
  }
};

const advertsDeleteRequest = () => ({
  type: ADVERTS_DELETE_REQUEST,
});

const advertsDeleteSuccess = id => ({
  type: ADVERTS_DELETE_SUCCESS,
  payload: id,
});

const advertsDeleteFailure = error => ({
  type: ADVERTS_DELETE_FAILURE,
  error: true,
  payload: error,
});

export const deleteAdvert = id => async (
  dispatch,
  _getState,
  { api, history },
) => {
  dispatch(advertsDeleteRequest());
  try {
    await api.adverts.deleteAdvert(id);
    dispatch(advertsDeleteSuccess(id));
    history.push('/');
  } catch (error) {
    dispatch(advertsDeleteFailure(error));
  }
};

export const resetError = () => ({
  type: UI_RESET_ERROR,
});
