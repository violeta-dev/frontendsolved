import T from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';

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

export default PrivateRoute;
