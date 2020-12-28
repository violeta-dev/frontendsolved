import * as types from './types';

const defaultState = {
  auth: false,
  adverts: null,
  tags: null,
  advert: null,
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return true;
    case types.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  return state;
}

export function tags(state = defaultState.adverts, action) {
  switch (action.type) {
    case types.TAGS_LOAD_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export function advert(state = defaultState.advert, action) {
  return state;
}
