export const getUi = state => state.ui;

export const getIsLogged = state => state.auth;

export const getTags = state => state.tags;

export const getAdverts = state => state.adverts;

export const getAdvert = id => state => state.advert[id];
