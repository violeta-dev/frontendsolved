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
