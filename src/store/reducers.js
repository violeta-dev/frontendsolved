import * as types from './types';
import { saleOptions } from '../definitions';

const defaultFilters = {
  name: '',
  sale: saleOptions.all.value,
  price: [],
  tags: [],
};

export const defaultState = {
  auth: false,
  adverts: null,
  filters: defaultFilters,
  tags: [],
  advert: {},
  ui: {
    loading: false,
    error: null,
  },
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
  switch (action.type) {
    case types.ADVERTS_LOAD_SUCCESS:
      return [...action.payload];
    case types.ADVERTS_CREATE_SUCCESS:
      if (!state) {
        return [action.payload];
      }
      return [...state, action.payload];
    case types.ADVERTS_DELETE_SUCCESS:
      return state && state.filter(advert => advert.id !== action.payload);
    default:
      return state;
  }
}

export function filters(state = defaultState.filters, action) {
  switch (action.type) {
    case types.FILTERS_SAVE:
      return action.payload;
    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case types.TAGS_LOAD_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export function advert(state = defaultState.advert, action) {
  switch (action.type) {
    case types.ADVERT_LOAD_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.type === types.UI_RESET_ERROR) {
    return { ...state, error: null };
  }
  if (/_REQUEST$/.test(action.type)) {
    return { loading: true, error: null };
  }
  if (/_SUCCESS$/.test(action.type)) {
    return { loading: false, error: null };
  }
  if (/_FAILURE$/.test(action.type)) {
    return { loading: false, error: action.payload };
  }

  return state;
}
