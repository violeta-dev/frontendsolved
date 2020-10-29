import { useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { logout } from '../../api/auth';

function App({ isInitiallyLogged = false, onLogin, onLogout }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);
  const history = useHistory();
  const location = useLocation();

  return (
    <div>
      <Link to="/">Adverts</Link>
      <Link to="/adverts/new">Create advert</Link>
      {isLogged && (
        <button
          onClick={() => {
            logout().then(() => {
              setIsLogged(false);
              onLogout();
            });
          }}
        >
          Logout
        </button>
      )}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/login" exact>
          <LoginPage
            onLogin={(...args) => {
              setIsLogged(true);
              onLogin(...args);
              const { from } = location.state || { from: { pathname: '/' } };
              history.replace(from);
            }}
          />
        </Route>
        <PrivateRoute path="/adverts" exact isLogged={isLogged}>
          <AdvertsPage />
        </PrivateRoute>
        <PrivateRoute
          path="/adverts/new"
          exact
          component={NewAdvertPage}
          isLogged={isLogged}
        />
        <PrivateRoute
          path="/adverts/:id"
          exact
          component={AdvertPage}
          isLogged={isLogged}
        />
        <PrivateRoute isLogged={isLogged}>NOT FOUND</PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
