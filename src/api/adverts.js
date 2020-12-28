import client from './client';

const { REACT_APP_API_HOST: host } = process.env;

export const getAdverts = filters => {
  return client
    .get(`/adverts`, { params: filters })
    .then(({ rows: adverts }) => adverts);
};

export const getAdvert = id =>
  client.get(`/adverts/${id}`).then(advert => {
    advert.photoUrl = `${host}${advert.photo}`;
    return advert;
  });

export const getTags = () => client.get('/adverts/tags');

export const createAdvert = advert => client.post(`/adverts`, advert);

export const deleteAdvert = id => client.delete(`/adverts/${id}`);
