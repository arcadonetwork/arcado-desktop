import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/home-page/Home'
import { LoginPage } from '../../pages/login/LoginPage'
import { GameDetailsPage } from '../../pages/game-details/GameDetailsPage'
import { AccountDetails } from '../../pages/account-details/AccountDetails'
import { TournamentPage } from '../../pages/tournament-page/TournamentPage'
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
  TOURNAMENT_PAGE: '/:gameId/tournaments/:tournamentId',
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

export const getGameTournamentItemRoute = (gameId: string, tournamentId: string) => {
  return ROUTES.TOURNAMENT_PAGE
    .replace(':gameId', gameId)
    .replace(':tournamentId', tournamentId);
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
        component={Home}
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
        path={ROUTES.TOURNAMENT_PAGE}
        component={TournamentPage}
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
