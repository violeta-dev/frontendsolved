import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './App';

// Read token from storage
const auth = storage.get('auth') || {};

// Configure api client
configureClient(auth);

ReactDOM.render(
  <BrowserRouter>
    <App
      onLogin={(auth, remember) => {
        if (remember) {
          storage.set('auth', auth);
        }
      }}
      onLogout={() => {
        storage.remove('auth');
      }}
      isInitiallyLogged={!!auth.token}
    />
  </BrowserRouter>,
  document.getElementById('root'),
);
