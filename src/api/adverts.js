import client from './client';

export const getAdverts = ({ name, sale, price, tags }) => {
  const filters = [
    name ? `name=${name}` : '',
    sale === 'sell' ? 'sale=true' : sale === 'buy' ? 'sale=false' : '',
    price.length ? `price=${price.join('-')}` : '',
    tags.length ? `tags=${tags.join(',')}` : '',
  ]
    .filter(filter => filter)
    .join('&');
  const queryString = filters && `?${filters}`;
  return client.get(`/adverts${queryString}`);
};

export const getAdvert = id => client.get(`/adverts/${id}`);

export const getTags = () => client.get('/adverts/tags');

export const createAdvert = advert => client.post(`/adverts`, advert);

export const deleteAdvert = id => client.delete(`/adverts/${id}`);
