import React from 'react';
import { TournamentModel } from '../../typings/tournament.model';
import { getGamesItemRoute, ROUTES } from '../../shared/router/Router';
import { Link } from 'react-router-dom';
import { TournamentPageHeaderActions } from './TournamentPageHeaderActions';
import { GameModel } from '../../typings/game.model';
import { Breadcrumb } from 'antd';
import { ParticipantModel } from '../../typings/participant.model';
import { AccountModel } from '../../typings/account';
import { TournamentPageHeaderPrizeBanner } from './TournamentPageHeaderPrizeBanner';
import { TournamentStateModel } from '../../typings/tournament-state.model';

interface ContainerProps {
  game: GameModel,
  tournament: TournamentModel,
  players: ParticipantModel[]
  account: AccountModel,
  tournamentState: TournamentStateModel
}

export const TournamentPageHeader: React.FC<ContainerProps> = ({ game, tournament, players, account, tournamentState }) => {
  return (
    <div className="w100 flex-fs flex-column mb25">

      <div className="w100 mb50">
        <Breadcrumb className="fs-s">
          <Breadcrumb.Item>
            <Link to={ROUTES.HOME}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={getGamesItemRoute(game.id)}>{game.name}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>{tournament.name}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="w100 flex-c br-b mb15">

        <h1 className="w50 fs-xl ffm-bold fc-black p0 m0 lh-none mb25">
          {tournament.name}
        </h1>

        <div className="ml-auto mb5">
          <TournamentPageHeaderActions
            tournament={tournament}
            players={players}
            account={account}
            tournamentState={tournamentState}
          />
        </div>

      </div>

      <TournamentPageHeaderPrizeBanner
        tournament={tournament}
        tournamentState={tournamentState}
      />
    </div>
  )
}
