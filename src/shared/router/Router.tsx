import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/home-page/Home'
import { LoginPage } from '../../pages/login/LoginPage'
import { GameDetailsPage } from '../../pages/game-details/GameDetailsPage'
import { AccountDetails } from '../../pages/account-details/AccountDetails'
import { TournamentPage } from '../../pages/tournament-page/TournamentPage'
import { ProtectedRoute } from './ProtectedRoute';
import InitialiseAccount from '../../pages/initialise-account/InitialiseAccount';
import { LogoutPage } from '../../pages/logout/LogoutPage';
import { TransactionDetails } from '../../pages/transaction-details/TransactionDetails';
import { CreateGame } from '../../pages/create-game/CreateGame';
import { DelegatesOverview } from '../../pages/delegates-overview/DelegatesOverview';

export const ROUTES = {
  ACCOUNT_DETAILS: '/address/:address',
  CREATE_GAME: '/games/create',
  DELEGATES: '/delegates',
  GAME_DETAILS: '/:gameId',
  HOME: '/',
  INITIALISE: '/initialise',
  LOGIN: '/login',
  LOGOUT: '/logout',
  GAMES: '/games',
  TOURNAMENT_PAGE: '/:gameId/tournaments/:id',
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

export const getGameTournamentItemRoute = (gameId: string, id: string) => {
  return ROUTES.TOURNAMENT_PAGE
    .replace(':gameId', gameId)
    .replace(':id', id);
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
        path={ROUTES.DELEGATES}
        component={DelegatesOverview}
      />

      <ProtectedRoute
        exact
        path={ROUTES.HOME}
        component={Home}
      />

      <ProtectedRoute
        exact
        path={ROUTES.GAMES}
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
        path={ROUTES.CREATE_GAME}
        component={CreateGame}
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
