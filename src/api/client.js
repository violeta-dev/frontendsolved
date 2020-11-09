import axios from 'axios';

const {
  REACT_APP_API_HOST: host,
  REACT_APP_API_VERSION: version,
} = process.env;
const baseURL = `${host}/${version}`;

// Create axios instance
const client = axios.create({
  baseURL,
});

const setAuthorizationHeader = token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

// Login method
client.login = credentials =>
  client.post('/auth/login', credentials).then(auth => {
    // Set Authorization header for future requests
    setAuthorizationHeader(auth.token);
    return auth;
  });

// Logout method
client.logout = () =>
  new Promise(resolve => {
    // Remove Authorization header
    removeAuthorizationHeader();
    resolve();
  });

// Intercepts response
client.interceptors.response.use(
  ({ data: { ok, ...result } }) => {
    if (!ok) {
      return Promise.reject(result.error);
    }
    return Promise.resolve(result);
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response.data.error);
    }
    return Promise.reject(error);
  },
);

// Configure client
export const configureClient = token => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export default client;
