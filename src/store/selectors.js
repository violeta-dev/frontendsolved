import { defaultState } from './reducers';

export const getUi = state => state.ui;

export const getIsLogged = state => state.auth;

export const getTags = state => state.tags;

export const getAdverts = state => state.adverts;

export const getFilters = state => state.filters;

export const getAreAdvertsFiltered = state =>
  JSON.stringify(state.filters) !== JSON.stringify(defaultState.filters);

export const getAdvert = id => state => state.advert[id];
