import React from 'react';
import RoomModel from '../../models/room.model';

interface ContainerProps {
  room: RoomModel
}

export const RoomDetailsPageHeader: React.FC<ContainerProps> = ({ room }) => {
  return (
    <div className="flex-c">
      <div className="bgc-lgrey h225--fixed w175--fixed mr50" />
      <div>
        <h1 className="ffm-bold">{room.title}</h1>
      </div>
    </div>
  )
}
