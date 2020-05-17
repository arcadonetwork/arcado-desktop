import React from 'react';
import { Route, Switch } from 'react-router';

import { HomePage } from '../../pages/home/HomePage'

export const ROUTES = {
  HOME: '/'
};

export const AppRoutes = () => (
  <Switch>

    <Route
      exact
      path={ROUTES.HOME}
      component={HomePage}
    />
  </Switch>
)
