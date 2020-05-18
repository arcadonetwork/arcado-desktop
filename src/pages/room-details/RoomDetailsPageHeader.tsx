import React from 'react';
import RoomModel from '../../models/room.model';
import { Button } from 'antd';

interface ContainerProps {
  room: RoomModel
}

export const RoomDetailsPageHeader: React.FC<ContainerProps> = ({ room }) => {
  return (
    <div className="flex-c mb50">
      <div className="bgc-lgrey h225--fixed w175--fixed mr50" />
      <div>
        <h3 className="">{room.game.title}</h3>
        <h1 className="fs-xl mb25">
          <span>Room:</span>{' '}
          <span className="ffm-bold fc-black">{room.title}</span>
        </h1>
        <div className="w100">
          <Button className="w175--fixed" type="primary">Participate</Button>
        </div>
      </div>
    </div>
  )
}
