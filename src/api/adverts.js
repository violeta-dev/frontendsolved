import client from './client';

export const getAdverts = () => client.get('/adverts');

export const getAdvert = id => client.get(`/adverts/${id}`);

export const getTags = () => client.get('/adverts/tags');

export const createAdvert = advert => client.post(`/adverts`, advert);
