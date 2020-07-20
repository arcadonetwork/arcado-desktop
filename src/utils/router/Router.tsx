import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../pages/home-page/HomePage'
import { LoginPage } from '../../pages/login/LoginPage'
import { GameDetailsPage } from '../../pages/game-details/GameDetailsPage'
import { AccountDetailsPage } from '../../pages/account-details/AccountDetailsPage'
import { RoomDetailsPage } from '../../pages/room-details/RoomDetailsPage'
import { ProtectedRoute } from './ProtectedRoute';
import { InitialiseAccountPageVerification } from '../../pages/initialise-account/InitialiseAccountPageVerification';
import InitialiseAccountPage from '../../pages/initialise-account/InitialiseAccountPage';
import { LogoutPage } from '../../pages/logout/LogoutPage';
import { message } from 'antd';

export const ROUTES = {
  GAME_DETAILS: '/:gameId',
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  ROOM_DETAILS: '/:gameId/rooms/:roomId',
  ACCOUNT_DETAILS: '/address/:address',
  ACCOUNT_VERIFICATION: '/account-verification',
  INITIALISE: '/initialise'
};

export const getAccountDetailsRoute = (address: string) => {
  if (address === undefined) {
    message.info('invalid address');
    return ROUTES.HOME;
  }
  return ROUTES.ACCOUNT_DETAILS
    .replace(':address', address);
}

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
        path={ROUTES.LOGOUT}
        component={LogoutPage}
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
        component={InitialiseAccountPageVerification}
      />

      <ProtectedRoute
        exact
        path={ROUTES.GAME_DETAILS}
        component={GameDetailsPage}
      />

    </Switch>
  )
}
