import React from 'react';
import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { AuthContextProvider } from '../../contexts/auth';

class App extends React.Component {
  state = {
    isLogged: this.props.isInitiallyLogged,
  };

  handleLogin = (...args) => {
    const { onLogin } = this.props;
    this.setState({ isLogged: true }, () => onLogin(...args));
  };

  handleLogout = () => {
    const { onLogout } = this.props;
    this.setState({ isLogged: false }, onLogout);
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
  onLogin: T.func.isRequired,
  onLogout: T.func.isRequired,
};

export default App;
