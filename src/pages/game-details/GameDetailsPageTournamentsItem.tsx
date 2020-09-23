import React from 'react';
import { TournamentModel } from '../../models/tournament.model';
import { Link } from 'react-router-dom';
import { getGameTournamentItemRoute } from '../../shared/router/Router';
import { fromRawLsk } from '../../utils/lsk';

interface ContainerProps {
  tournament: TournamentModel
}

export const GameDetailsPageTournamentsItem: React.FC<ContainerProps> = ({ tournament }) => {
  const uri = getGameTournamentItemRoute(tournament.gameId, tournament.tournamentId);
  return (
    <Link to={uri} className="tournament-tile bgc-xxl-grey mb10 flex-fs flex-column br5 br game-item">
      <div className="w100 mb25">
        <div className="tournament-tile-img w100 pt50 pb50 br5-top flex-c flex-column flex-jc-c">
          <span className="ffm-bold fc-white fs-m">TOURNAMENT</span>
        </div>
      </div>
      <div className="w100 pl15 pr15 pb15 flex-fs flex-column">
        <span className="fc-grey fs-s">Sep. 15, starting at 16:00 PM</span>
        <span className="ffm-bold fc-lb">{tournament.name}</span>
        <div className="flex-fs flex-column mt15">
          <div className="fc-grey fs-s">Prize Pool</div>
          <span className="ffm-bold fc-black fs-s">{Number(fromRawLsk(tournament.entryFee)) * tournament.maxPlayers} LSK</span>
        </div>
      </div>
    </Link>
  )
}
