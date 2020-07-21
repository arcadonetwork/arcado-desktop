import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../pages/home-page/HomePage'
import { LoginPage } from '../../pages/login/LoginPage'
import { GameDetailsPage } from '../../pages/game-details/GameDetailsPage'
import { AccountDetails } from '../../pages/account-details/AccountDetails'
import { RoomDetailsPage } from '../../pages/room-details/RoomDetailsPage'
import { ProtectedRoute } from './ProtectedRoute';
import { InitialiseAccountVerification } from '../../pages/initialise-account/InitialiseAccountVerification';
import InitialiseAccount from '../../pages/initialise-account/InitialiseAccount';
import { LogoutPage } from '../../pages/logout/LogoutPage';
import { TransactionDetails } from '../../pages/transaction-details/TransactionDetails';

export const ROUTES = {
  GAME_DETAILS: '/:gameId',
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  ROOM_DETAILS: '/:gameId/rooms/:roomId',
  ACCOUNT_DETAILS: '/address/:address',
  ACCOUNT_VERIFICATION: '/account-verification',
  INITIALISE: '/initialise',
  TRANSACTION_DETAILS: '/tx/:txId'
};

export const getAccountDetailsRoute = (address: string) => {
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

export const getTransactionDetailsRoute = (txId: string) => {
  return ROUTES.TRANSACTION_DETAILS
    .replace(':txId', txId)
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
        component={InitialiseAccount}
      />

      <ProtectedRoute
        exact
        path={ROUTES.ROOM_DETAILS}
        component={RoomDetailsPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.ACCOUNT_DETAILS}
        component={AccountDetails}
      />

      <ProtectedRoute
        exact
        path={ROUTES.ACCOUNT_VERIFICATION}
        component={InitialiseAccountVerification}
      />

      <ProtectedRoute
        exact
        path={ROUTES.GAME_DETAILS}
        component={GameDetailsPage}
      />

      <ProtectedRoute
        exact
        path={ROUTES.TRANSACTION_DETAILS}
        component={TransactionDetails}
      />

    </Switch>
  )
}
