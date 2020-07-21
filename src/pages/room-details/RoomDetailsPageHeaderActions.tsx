import React, { useState } from 'react';
import RoomModel from '../../models/room.model';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { startRoom } from '../../utils/api/rooms';
import { RoomDetailsPageHeaderParticipateModal } from './RoomDetailsPageHeaderParticipateModal';
import { RoomDetailsPageHeaderStopModal } from './RoomDetailsPageHeaderStopModal';

interface ContainerProps {
  room: RoomModel,
  refresh(): void
}

export const RoomDetailsPageHeaderActions: React.FC<ContainerProps> = ({ room, refresh }) => {
  const account = useSelector((state: iRootState) => state.session.account);
  const [intendsToParticipate, setIntendsToParticipate] = useState<boolean>(false);
  const [intendsToStop, setIntendsToStop] = useState<boolean>(false);

  async function start () {
    if (room.addresses.length !== Number(room.maxPlayers)) {
      message.error('The room isn\'t full');
      return;
    }
    try {
      await startRoom(room.gameId, room.id, {
        address: account.address,
        roomId: room.id,
        passphrase: account.passphrase
      });
      message.success('successfully started the room')
      refresh();
    } catch (e) {
      console.error(e);
      message.error('something went wrong')
    }
  }

  let actions = [];

  if (room.status === 2) {
    actions.push(<div>
      game is finished
    </div>)
  } else if (room.createdBy === account.address) {
    if (room.status === 1) {
      actions.push(
        <div className="flex-fs">
          <Button
            className="w175--fixed h45--fixed"
            type="primary"
            onClick={() => setIntendsToStop(true)}
          >
            End Game
          </Button>
        </div>
      )
    } else {
      actions.push(
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
  } else {
    const hasJoined = !!(room.addresses.find(item => item === account.address))
    if (hasJoined || Number(room.maxPlayers) === room.addresses.length) {
      actions.push(
        <Button
          disabled
          className="h45--fixed"
          type="primary"
        >
          The room owner will start very soon
        </Button>
      )
    } else if (room.status === 1) {
      actions.push(
        <Button
          disabled
          className="w175--fixed h45--fixed"
          type="primary"
        >
          The game is about to start
        </Button>
      )
    } else {
      actions.push(
        <Button
          onClick={() => setIntendsToParticipate(true)}
          className="w175--fixed h45--fixed"
          type="primary"
        >
          Join Game
        </Button>
      )
    }
  }

  return (
    <>
      <div className="flex-c">
        {
          actions
        }
      </div>
      <RoomDetailsPageHeaderParticipateModal
        room={room}
        refresh={refresh}
        intendsToParticipate={intendsToParticipate}
        setIntendsToParticipate={setIntendsToParticipate}
      />
      <RoomDetailsPageHeaderStopModal
        room={room}
        refresh={refresh}
        intendsToStop={intendsToStop}
        setIntendsToStop={setIntendsToStop}
      />
    </>
  )
}
