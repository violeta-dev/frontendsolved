import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from './types';

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

export const resetError = () => ({
  type: UI_RESET_ERROR,
});
