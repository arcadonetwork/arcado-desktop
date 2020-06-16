import RoomModel from '../../models/room.model';
import React from 'react';
import { message, Modal } from 'antd';
import { roomsApi } from '../../shared/services/rooms';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';

interface ContainerProps {
  room: RoomModel,
  refresh(): void,
  setIntendsToParticipate(value: boolean): void,
  intendsToParticipate: boolean
}

export const RoomDetailsPageHeaderParticipateModal: React.FC<ContainerProps> = ({ room, refresh, intendsToParticipate, setIntendsToParticipate }) => {
  const account = useSelector((state: iRootState) => state.session.account);

  async function participate () {
    try {
      const isPresent = (room.addresses || []).find(address => address === account.address)
      if (isPresent) {
        message.error('You are already participating')
        return;
      }
      await roomsApi.join(room.gameId, room.id, {
        address: account.address,
        roomId: room.id,
        passphrase: account.passphrase
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
      title="Accept Transaction"
      visible={intendsToParticipate}
      onOk={participate}
      onCancel={() => setIntendsToParticipate(false)}
      okText="Participate"
    >
      <div className="flex-c flex-column flex-jc-c fs-m">
        <div className="">You are about to participate in the <span className="fc-black ffm-bold">{room.name}</span> room.</div>
        <div>Do you agree on adding <span className="fc-black ffm-bold">{room.entryFee} LSK</span> from your balance to the prize pool?</div>
      </div>
    </Modal>
  )
}
