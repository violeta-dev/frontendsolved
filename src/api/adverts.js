import client from './client';

const { REACT_APP_API_HOST: host } = process.env;

export const getAdverts = filters => {
  return client.get(`/adverts`, { params: filters });
};

export const getAdvert = id =>
  client.get(`/adverts/${id}`).then(response => {
    response.result.photoUrl = `${host}${response.result.photo}`;
    return response;
  });

export const getTags = () => client.get('/adverts/tags');

export const createAdvert = advert => client.post(`/adverts`, advert);

export const deleteAdvert = id => client.delete(`/adverts/${id}`);
