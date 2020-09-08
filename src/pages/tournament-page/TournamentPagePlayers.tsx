import React from 'react';
import { TournamentPagePlayersItem } from './TournamentPagePlayersItem';
import { ParticipantModel } from '../../models/participant.model';
import { isArrayWithElements } from '../../utils/type-checking';

interface ContainerProps {
  tournamentId: string,
  players: ParticipantModel[]
}

export const TournamentPagePlayers: React.FC<ContainerProps> = ({ players }) => {
  return (
    <div className="br5 pl15 pr15 bgc-xxl-grey mt15">
      {
        !isArrayWithElements(players)
          ? (
            <div className="p15-25 fs-s mt25">
              No players in the lobby yet
            </div>
          )
          : players.map(
          (player, index) =>
            <TournamentPagePlayersItem
              key={player.address}
              address={player.address}
              isLastChild={index === players.length - 1}
            />
          )
      }
    </div>
  )
}
