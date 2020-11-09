import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/App';

// Read token from storage
const { token } = storage.get('auth') || { token: null };

// Configure api client
configureClient(token);

ReactDOM.render(
  <BrowserRouter>
    <App isInitiallyLogged={!!token} />
  </BrowserRouter>,
  document.getElementById('root'),
);
