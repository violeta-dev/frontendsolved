import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Redirect to="/adverts" />
    </Route>
    <Route path="/login" exact component={LoginPage} />
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
);

export default App;
