import React from 'react';
import RoomModel from '../../models/room.model';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { roomsApi } from '../../shared/services/rooms';

interface ContainerProps {
  room: RoomModel,
  refresh(): void
}

export const RoomDetailsPageHeader: React.FC<ContainerProps> = ({ room, refresh }) => {
  const account = useSelector((state: iRootState) => state.session.account);

  async function participate () {
    try {
      await roomsApi.join(room.gameId, room.id, {
        address: account.address,
        roomId: room.id
      });
      message.success('successfully joined the room')
      refresh();
    } catch (e) {
      console.error(e);
      message.error('something went wrong')
    }
  }

  return (
    <div className="flex-c mb50">
      <div className="bgc-lgrey h225--fixed w175--fixed mr50" />
      <div>
        <h3 className="">{room.game.name}</h3>
        <h1 className="fs-xl mb25">
          <span>Room:</span>{' '}
          <span className="ffm-bold fc-black">{room.name}</span>
        </h1>
        <div className="w100">
          <Button
            onClick={participate}
            type="primary"
          >
            Participate
          </Button>
        </div>
      </div>
    </div>
  )
}
