import React, { useState } from 'react';
import RoomModel from '../../models/room.model';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { roomsApi } from '../../shared/services/rooms';
import { RoomDetailsPageHeaderParticipateModal } from './RoomDetailsPageHeaderParticipateModal';

interface ContainerProps {
  room: RoomModel,
  refresh(): void
}

export const RoomDetailsPageHeaderActions: React.FC<ContainerProps> = ({ room, refresh }) => {
  const account = useSelector((state: iRootState) => state.session.account);
  const [intendsToParticipate, setIntendsToParticipate] = useState(false);

  async function start () {
    if (room.addresses.length !== room.maxPlayers) {
      message.error('The room isn\'t full');
      return;
    }
    try {
      await roomsApi.start(room.gameId, room.id, {
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

  async function stop () {
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

  if (room.createdBy === account.address) {
    return (
      <div className="flex-fs">
        <Button
          className="w175--fixed h45--fixed"
          type="primary"
          onClick={start}
        >
          Start Game
        </Button>
      </div>
    )
  }

  const hasJoined = !!(room.addresses.find(item => item === account.address))
  const hasStarted = !!(room.addresses.find(item => item === account.address))

  if (hasJoined) {
    return (
      <Button
        disabled
        className="h45--fixed"
        type="primary"
      >
        The room owner will start very soon
      </Button>
    )
  }

  if (hasStarted) {
    return (
      <Button
        disabled
        onClick={stop}
        className="w175--fixed h45--fixed"
        type="primary"
      >
        The game is about to start
      </Button>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIntendsToParticipate(true)}
        className="w175--fixed h45--fixed"
        type="primary"
      >
        Join Game
      </Button>
      <RoomDetailsPageHeaderParticipateModal
        room={room}
        refresh={refresh}
        intendsToParticipate={intendsToParticipate}
        setIntendsToParticipate={setIntendsToParticipate}
      />
    </>
  )
}
