import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../pages/home-page/HomePage'
import { LoginPage } from '../../pages/login/LoginPage'
import { GameDetailsPage } from '../../pages/game-details/GameDetailsPage'
import { AccountDetailsPage } from '../../pages/account-details/AccountDetailsPage'
import { RoomDetailsPage } from '../../pages/room-details/RoomDetailsPage'
import { ProtectedRoute } from './ProtectedRoute';
import { AccountVerificationPage } from '../../pages/account-verification/AccountVerificationPage';
import InitialiseAccountPage from '../../pages/initialise-account/InitialiseAccountPage';

export const ROUTES = {
  GAME_DETAILS: '/:gameId',
  HOME: '/',
  LOGIN: '/login',
  ROOM_DETAILS: '/:gameId/rooms/:roomId',
  ACCOUNT_DETAILS: '/settings',
  ACCOUNT_VERIFICATION: '/account-verification',
  INITIALISE: '/initialise'
};

export const getGamesItemRoute = (gameId: string) => {
  return ROUTES.GAME_DETAILS
    .replace(':gameId', gameId);
}

export const getGameRoomItemRoute = (gameId: string, roomId: string) => {
  return ROUTES.ROOM_DETAILS
    .replace(':gameId', gameId)
    .replace(':roomId', roomId);
}

export default () => {
  return (
    <Switch>

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

      <Route
        exact
        path={ROUTES.INITIALISE}
        component={InitialiseAccountPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.ROOM_DETAILS}
        component={RoomDetailsPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.ACCOUNT_DETAILS}
        component={AccountDetailsPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.ACCOUNT_VERIFICATION}
        component={AccountVerificationPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.GAME_DETAILS}
        component={GameDetailsPage}
      />

    </Switch>
  )
}
