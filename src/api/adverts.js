import client from './client';

const { REACT_APP_API_HOST: host } = process.env;

export const getAdverts = filters => {
  return client
    .get(`/adverts`, { params: filters })
    .then(({ rows: adverts }) =>
      adverts.map(advert => ({ ...advert, id: advert._id })),
    );
};

export const getAdvert = id =>
  client.get(`/adverts/${id}`).then(advert => {
    if (!advert) {
      const error = 'Not found';
      throw error;
    }
    advert.photoUrl = `${host}${advert.photo}`;
    advert.id = id;
    return advert;
  });

export const getTags = () => client.get('/adverts/tags');

export const createAdvert = advert => client.post(`/adverts`, advert);

export const deleteAdvert = id => client.delete(`/adverts/${id}`);
