import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isLogged, ...props }) =>
  isLogged ? <Route {...props} /> : <Redirect to="/login" />;

export default PrivateRoute;
