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
  ADVERTS_CREATE_REQUEST,
  ADVERTS_CREATE_SUCCESS,
  ADVERTS_CREATE_FAILURE,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_DELETE_FAILURE,
  FILTERS_SAVE,
  ADVERT_LOAD_REQUEST,
  ADVERT_LOAD_SUCCESS,
  ADVERT_LOAD_FAILURE,
  UI_RESET_ERROR,
} from './types';
import { getTags, getAdvert, getFilters } from './selectors';
import { defaultState } from './reducers';

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

export const login = ({ remember, ...credentials }, location) => async (
  dispatch,
  _getState,
  { api, history, storage },
) => {
  dispatch(authLoginRequest());
  try {
    const auth = await api.auth.login(credentials);
    // Store token
    if (remember) {
      storage.set('auth', auth);
    }
    // Dispatch action
    dispatch(authLoginSuccess());
    // Navigate to previously required route
    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  } catch (error) {
    dispatch(authLoginFailure(error));
  }
};

export const logout = () => async (
  dispatch,
  _getState,
  { api, history, storage },
) => {
  await api.auth.logout();
  storage.remove('auth');
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

const advertsLoadSuccess = payload => ({
  type: ADVERTS_LOAD_SUCCESS,
  payload,
});

const advertsLoadFailure = error => ({
  type: ADVERTS_LOAD_FAILURE,
  error: true,
  payload: error,
});

export const loadAdverts = () => async (dispatch, getState, { api }) => {
  dispatch(advertsLoadRequest());
  try {
    const filters = getFilters(getState());
    const adverts = await api.adverts.getAdverts(
      JSON.stringify(filters) !== JSON.stringify(defaultState.filters)
        ? filters
        : undefined,
    );
    dispatch(advertsLoadSuccess(adverts));
  } catch (error) {
    dispatch(advertsLoadFailure(error));
  }
};

const advertsCreateRequest = () => ({
  type: ADVERTS_CREATE_REQUEST,
});

const advertsCreateSuccess = () => ({
  type: ADVERTS_CREATE_SUCCESS,
});

const advertsCreateFailure = error => ({
  type: ADVERTS_CREATE_FAILURE,
  error: true,
  payload: error,
});

export const createAdvert = advert => async (
  dispatch,
  _getState,
  { api, history },
) => {
  dispatch(advertsCreateRequest());
  try {
    const createdAdvertId = await api.adverts.createAdvert(advert);
    dispatch(advertsCreateSuccess());
    history.push(`/adverts/${createdAdvertId}`);
  } catch (error) {
    dispatch(advertsCreateFailure(error));
  }
};

const filtersSave = filters => ({
  type: FILTERS_SAVE,
  payload: filters,
});

export const loadFilteredAdverts = filters => (
  dispatch,
  _getState,
  { storage },
) => {
  dispatch(filtersSave(filters));
  storage.set('filters', filters);
  dispatch(loadAdverts());
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

export const resetError = () => ({
  type: UI_RESET_ERROR,
});
