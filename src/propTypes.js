import T from 'prop-types';

export const store = T.shape({
  dispatch: T.func.isRequired,
  getState: T.func.isRequired,
  subscribe: T.func.isRequired,
});

export const history = T.shape({
  push: T.func.isRequired,
  replace: T.func.isRequired,
});

export const location = T.shape({
  state: T.shape({ from: T.shape({ pathname: T.string }) }),
});

export const match = T.shape({
  params: T.shape({ id: T.string.isRequired }).isRequired,
});

export const ui = {
  loading: T.bool,
  error: T.string,
};

export const tags = T.arrayOf(T.string.isRequired);

export const advert = {
  name: T.string.isRequired,
  price: T.number.isRequired,
  tags: tags.isRequired,
  sale: T.bool.isRequired,
  photoUrl: T.string,
};
