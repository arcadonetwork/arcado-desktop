import React from 'react';
import { TournamentModel } from '../../models/tournament.model';
import { Link } from 'react-router-dom';
import { getGameTournamentItemRoute } from '../../utils/router/Router';
import { fromRawLsk } from '../../utils/lsk';

interface ContainerProps {
  gameId: string,
  tournament: TournamentModel,
  isLastChild: boolean
}

export const GameDetailsPageTournamentsItem: React.FC<ContainerProps> = ({ gameId, tournament, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  const uri = getGameTournamentItemRoute(gameId, tournament.tournamentId);
  return (
    <div className={`p15 flex-c br5 ${clazz}`}>
      <span className="w40">
        <Link to={uri} className="ffm-bold fc-black">{tournament.name}</Link>
      </span>
      <span className="w20">{fromRawLsk(tournament.entryFee)}</span>
      <span className="w20">{[].length} / {tournament.maxPlayers}</span>
      <Link to={uri} className="ml-auto">enter</Link>
    </div>
  )
}
