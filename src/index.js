import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import { configureStore } from './store';
import { configureClient } from './api/client';
import storage from './utils/storage';

import './index.css';
import App, { Root } from './components/App';

// Read token from storage
const { token } = storage.get('auth') || { token: null };

// Configure api client
configureClient(token);

// Configure history
const history = createBrowserHistory();

// Configure store
const store = configureStore({ auth: !!token }, { history });

ReactDOM.render(
  <Root history={history} store={store}>
    <App />
  </Root>,
  document.getElementById('root'),
);
