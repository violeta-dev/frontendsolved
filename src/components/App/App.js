import React from 'react';
import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { AuthContextProvider } from '../../contexts/auth';
import NotFoundPage from './NotFoundPage';

class App extends React.Component {
  state = {
    isLogged: this.props.isInitiallyLogged,
  };

  handleLogin = cb => {
    this.setState({ isLogged: true }, cb);
  };

  handleLogout = () => {
    this.setState({ isLogged: false });
  };

  render() {
    const { isLogged } = this.state;
    return (
      <AuthContextProvider
        value={{
          isLogged,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout,
        }}
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/adverts" />
          </Route>
          <Route path="/login" exact>
            {routerProps => (
              <LoginPage onLogin={this.handleLogin} {...routerProps} />
            )}
          </Route>
          <PrivateRoute path="/adverts" exact>
            <AdvertsPage />
          </PrivateRoute>
          <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
          <PrivateRoute path="/adverts/:id" exact component={AdvertPage} />
          <Route path="/404" exact>
            {NotFoundPage}
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </AuthContextProvider>
    );
  }
}

App.propTypes = {
  isInitiallyLogged: T.bool,
};

export default App;
