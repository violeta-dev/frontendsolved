import React from 'react';
import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { AuthContextProvider } from '../../contexts/auth';
import storage from '../../utils/storage';

class App extends React.Component {
  state = {
    isLogged: this.props.isInitiallyLogged,
  };

  handleLogin = (auth, remember) => {
    return new Promise(resolve => {
      this.setState({ isLogged: true }, () => {
        if (remember) {
          storage.set('auth', auth);
        }
        resolve();
      });
    });
  };

  handleLogout = () => {
    this.setState({ isLogged: false }, () => {
      storage.remove('auth');
    });
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
          <PrivateRoute>NOT FOUND</PrivateRoute>
        </Switch>
      </AuthContextProvider>
    );
  }
}

App.propTypes = {
  isInitiallyLogged: T.bool,
};

export default App;
