import RoomModel from '../../models/room.model';
import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { stopRoom } from '../../utils/api/rooms';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { SelectInputField } from '../../components/SelectInputField';

interface ContainerProps {
  room: RoomModel,
  refresh(): void,
  setIntendsToStop(value: boolean): void,
  intendsToStop: boolean
}

export const RoomDetailsPageHeaderStopModal: React.FC<ContainerProps> = ({ room, refresh, intendsToStop, setIntendsToStop }) => {
  const account = useSelector((state: iRootState) => state.session.account);
  const [first, setFirstPlace] = useState('');
  const [second, setSecondPlace] = useState('');
  const [third, setThirdPlace] = useState('');
  const [selectableAddresses, setSelectableAddresses] = useState(room.addresses);

  useEffect(() => {
    const filteredAddresses = room.addresses.filter(address => address !== first && address !== second && address !== third)
    setSelectableAddresses(filteredAddresses);
    return () => ''
  }, [first, second, third])

  async function stop () {
    try {
      await stopRoom(room.gameId, room.id, {
        address: account.address,
        roomId: room.id,
        first,
        second,
        third,
        passphrase: account.address
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
      okButtonProps={{ disabled: (!first || !second || !third) }}
      onCancel={() => setIntendsToStop(false)}
      okText="End"
    >
      <div className="flex-c flex-column flex-jc-c fs-m">
        <div className="mb25">You are about to stop the game for <span className="fc-black ffm-bold">{room.name}</span>.</div>
        <div className="w100 mb15">
          <SelectInputField
            label="First place"
            value={first}
            setValue={setFirstPlace}
            options={selectableAddresses}
          />
        </div>
        <div className="w100 mb15">
          <SelectInputField
            label="Second place"
            value={second}
            setValue={setSecondPlace}
            options={selectableAddresses}
          />
        </div>
        <div className="w100 mb15">
          <SelectInputField
            label="Third place"
            value={third}
            setValue={setThirdPlace}
            options={selectableAddresses}
          />
        </div>
      </div>
    </Modal>
  )
}
