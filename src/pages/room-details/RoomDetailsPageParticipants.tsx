import React from 'react';
import { RoomDetailsPageParticipantsItem } from './RoomDetailsPageParticipantsItem';
import ParticipantModel from '../../models/participant.model';


interface ContainerProps {
  participants: ParticipantModel[]
}

export const RoomDetailsPageParticipants: React.FC<ContainerProps> = ({ participants }) => {
  return (
    <div>
      <div className="flex-c ffm-bold mb25 fc-black fs-s">
        <span className="w40">Address</span>
        <span className="w20">Win/Loss Ratio</span>
        <span className="w20">Status</span>
      </div>
      {
        participants.map(
          (participant, index) =>
            <RoomDetailsPageParticipantsItem
              key={participant.address}
              participant={participant}
              isLastChild={index === participants.length - 1}
            />
        )
      }
    </div>
  )
}
