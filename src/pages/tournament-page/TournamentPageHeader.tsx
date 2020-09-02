import React from 'react';
import { TournamentModel } from '../../models/tournament.model';
import { getGamesItemRoute } from '../../utils/router/Router';
import { Link } from 'react-router-dom';
import { TournamentPageHeaderActions } from './TournamentPageHeaderActions';
import { fromRawLsk } from '../../utils/lsk';
import { ParticipantModel } from '../../models/participant.model';

interface ContainerProps {
  tournament: TournamentModel,
  refresh(): void,
  players: ParticipantModel[]
}

export const TournamentPageHeader: React.FC<ContainerProps> = ({ tournament, refresh, players }) => {
  const gameUri = getGamesItemRoute(tournament.gameId);
  return (
    <div className="flex-c mb25">
      <div className="bgc-lgrey game-image img--150 mr50">
        <img className="br5"  src={tournament.game.image} />
      </div>

      <div>
        <Link to={gameUri} className="fc-lgrey">{tournament.game.name}</Link>
        <div className="fs-xl ffm-bold fc-black mb15">{tournament.name}</div>
        <div className="flex-fs">
          <div className="flex-c flex-jc-fe mr50">
            <div className="mr50">Buyin:{'  '}<span className="fc-black ffm-bold">{fromRawLsk(tournament.entryFee)} LSK</span></div>
            <div className="mr50">Players:{'  '}<span className="fc-black ffm-bold">{[].length} / {tournament.maxPlayers}</span></div>
          </div>
        </div>
      </div>

      <div className="ml-auto">
        <TournamentPageHeaderActions
          tournament={tournament} refresh={refresh}
          players={players}
        />
      </div>

    </div>
  )
}
