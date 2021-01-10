import { defaultFilters } from '../components/adverts/AdvertsPage/FiltersForm';

export const getUi = state => state.ui;

export const getIsLogged = state => state.auth;

export const getTags = state => state.tags;

export const getAdverts = state => state.adverts;

export const getAreAdvertsFiltered = state =>
  JSON.stringify(state.filters) !== JSON.stringify(defaultFilters);

export const getAdvert = id => state => state.advert[id];
