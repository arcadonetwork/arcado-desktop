import React from 'react';
import ParticipantModel from '../../models/participant.model';

interface ContainerProps {
  participant: ParticipantModel,
  isLastChild: boolean
}

export const RoomDetailsPageParticipantsItem: React.FC<ContainerProps> = ({ participant, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  return (
    <div className={`mb10 fs-s flex-c mb10 pb15 ${clazz}`}>
      <span className="w40">
        <div>{participant.address}</div>
      </span>
      <span className="w20">
        {participant.win} / {participant.loss}
      </span>
      <span className="w20">
        {participant.status}
      </span>
    </div>
  )
}
