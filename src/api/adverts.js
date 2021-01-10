import client from './client';

const { REACT_APP_API_HOST: host } = process.env;

const formatFilters = ({ name, sale, price, tags }) => {
  const filters = {};
  if (name) {
    filters.name = name;
  }
  if (['sell', 'buy'].includes(sale)) {
    filters.sale = sale === 'sell';
  }
  if (price.length) {
    filters.price = price.join('-');
  }
  if (tags.length) {
    filters.tags = tags.join(',');
  }

  return filters;
};

export const getAdverts = filters =>
  client
    .get(`/adverts`, { params: filters ? formatFilters(filters) : filters })
    .then(({ rows: adverts }) =>
      adverts.map(advert => ({ ...advert, id: advert._id })),
    );

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
