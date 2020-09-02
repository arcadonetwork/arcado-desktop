import React from 'react';
import { TournamentPageParticipantsItem } from './TournamentPageParticipantsItem';
import { ParticipantModel } from '../../models/participant.model';


interface ContainerProps {
  players: ParticipantModel[]
}

export const TournamentPageParticipants: React.FC<ContainerProps> = ({ players }) => {
  return (
    <div>
      <div className="flex-c p15 br5 ffm-bold fs-s">
        <span className="w40 fc-black">Players</span>
      </div>
      <div className="bgc-white br br5">
        {
          players.map(
            (player, index) =>
              <TournamentPageParticipantsItem
                key={player.address}
                address={player.address}
                isLastChild={index === players.length - 1}
              />
          )
        }
      </div>
    </div>
  )
}
