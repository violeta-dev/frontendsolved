import T from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { AuthContextConsumer } from '../../contexts/auth';

const PrivateRoute = ({ isLogged, ...props }) => {
  const location = useLocation();
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};
PrivateRoute.propTypes = {
  isLogged: T.bool.isRequired,
};

const ConnectedToAuthPrivateRoute = props => (
  <AuthContextConsumer>
    {({ isLogged }) => <PrivateRoute isLogged={isLogged} {...props} />}
  </AuthContextConsumer>
);

export default ConnectedToAuthPrivateRoute;
