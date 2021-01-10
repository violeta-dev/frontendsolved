import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as api from '../api';

export function configureStore(preloadedState, { history, storage }) {
  const reducer = combineReducers(reducers);
  const middlewares = [thunk.withExtraArgument({ history, api, storage })];
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
}
