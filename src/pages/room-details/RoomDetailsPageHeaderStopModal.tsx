import RoomModel from '../../models/room.model';
import React from 'react';
import { message, Modal } from 'antd';
import { roomsApi } from '../../shared/services/rooms';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';

interface ContainerProps {
  room: RoomModel,
  refresh(): void,
  setIntendsToStop(value: boolean): void,
  intendsToStop: boolean
}

export const RoomDetailsPageHeaderStopModal: React.FC<ContainerProps> = ({ room, refresh, intendsToStop, setIntendsToStop }) => {
  const account = useSelector((state: iRootState) => state.session.account);
  console.log({intendsToStop})
  async function stop () {
    try {
      await roomsApi.stop(room.gameId, room.id, {
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
    <Modal
      title="End Game"
      visible={intendsToStop}
      onOk={stop}
      onCancel={() => setIntendsToStop(false)}
      okText="End"
    >
      <div className="flex-c flex-column flex-jc-c fs-m">
        <div className="">You are about to stop the game from <span className="fc-black ffm-bold">{room.name}</span>.</div>
        <div>Do you agree on adding <span className="fc-black ffm-bold">{room.entryFee} LSK</span> from your balance to the prize pool?</div>
      </div>
    </Modal>
  )
}
