import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES } from './routes'

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
import { VotingPage } from '../../pages/voting/VotingPage';
import { SettingsPage } from '../../pages/settings/SettingsPage';

export const ApplicationRoutes = () => {
  return (
    <Switch>

        <ProtectedRoute
          exact
          path={ROUTES.ACCOUNT_DETAILS}
          component={AccountDetails}
        />

        <ProtectedRoute
          exact
          path={ROUTES.CREATE_GAME}
          component={CreateGame}
        />

        <ProtectedRoute
          exact
          path={ROUTES.DELEGATES}
          component={DelegatesOverview}
        />

        <ProtectedRoute
          exact
          path={ROUTES.GAME_DETAILS}
          component={GameDetailsPage}
        />

        <ProtectedRoute
          exact
          path={ROUTES.GAMES}
          component={Home}
        />

        <ProtectedRoute
          exact
          path={ROUTES.HOME}
          component={Home}
        />

        <ProtectedRoute
          exact
          path={ROUTES.TOURNAMENT_PAGE}
          component={TournamentPage}
        />

        <ProtectedRoute
          exact
          path={ROUTES.TRANSACTION_DETAILS}
          component={TransactionDetails}
        />

        <ProtectedRoute
          path={ROUTES.SETTINGS}
          component={SettingsPage}
        />

        <ProtectedRoute
          exact
          path={ROUTES.VOTING}
          component={VotingPage}
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

        <Route
          exact
          path={ROUTES.LOGIN}
          component={LoginPage}
        />

    </Switch>
  )
}
