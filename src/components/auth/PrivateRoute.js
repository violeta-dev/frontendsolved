import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { getIsLogged } from '../../store/selectors';

const PrivateRoute = props => {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);
  return isLogged ? (
    <Route {...props} />
  ) : (
    // Store location in state
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
