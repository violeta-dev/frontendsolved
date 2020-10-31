import client from './client';

export const getAdverts = filters => {
  const queryString = filters && `?${filters}`;
  return client.get(`/adverts${queryString}`);
};

export const getAdvert = id => client.get(`/adverts/${id}`);

export const getTags = () => client.get('/adverts/tags');

export const createAdvert = advert => client.post(`/adverts`, advert);

export const deleteAdvert = id => client.delete(`/adverts/${id}`);
