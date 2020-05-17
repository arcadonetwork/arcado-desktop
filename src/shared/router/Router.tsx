import React from 'react';
import { Route, Switch } from 'react-router';

import { HomePage } from '../../pages/home/HomePage'
import { LoginPage } from '../../pages/login/LoginPage'
import { PrivateRoute } from './PrivateRoute';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login'
};

export const AppRoutes = () => (
  <Switch>

    <PrivateRoute
      exact
      path={ROUTES.HOME}
      component={HomePage}
    />

    <Route
      exact
      path={ROUTES.LOGIN}
      component={LoginPage}
    />

  </Switch>
)
