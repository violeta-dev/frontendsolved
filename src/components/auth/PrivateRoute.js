import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import AuthContext from '../../contexts/auth';

const PrivateRoute = props => {
  const { isLogged } = useContext(AuthContext);
  const location = useLocation();
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
