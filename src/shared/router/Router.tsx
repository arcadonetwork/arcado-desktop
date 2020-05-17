import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../pages/home/HomePage'
import { LoginPage } from '../../pages/login/LoginPage'
import { GameDetailsPage } from '../../pages/game-details/GameDetailsPage'
import { UserDetailsPage } from '../../pages/user-details/UserDetailsPage'
import { RoomDetailsPage } from '../../pages/room-details/RoomDetailsPage'
import { ProtectedRoute } from './ProtectedRoute';

export const ROUTES = {
  GAME_DETAILS: '/games/:gameId',
  HOME: '/',
  LOGIN: '/login',
  ROOM_DETAILS: '/rooms/:roomId',
  USER_DETAILS: '/settings'
};

export default () => {
  return (
    <Switch>

      <ProtectedRoute
        exact
        path={ROUTES.GAME_DETAILS}
        component={GameDetailsPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.USER_DETAILS}
        component={UserDetailsPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.ROOM_DETAILS}
        component={RoomDetailsPage}
      />

      <ProtectedRoute
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
}
