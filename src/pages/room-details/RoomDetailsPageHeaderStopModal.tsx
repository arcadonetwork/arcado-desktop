import RoomModel from '../../models/room.model';
import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { roomsApi } from '../../shared/services/rooms';
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
  const [firstPlace, setFirstPlace] = useState('');
  const [secondPlace, setSecondPlace] = useState('');
  const [thirdPlace, setThirdPlace] = useState('');
  const [selectableAddresses, setSelectableAddresses] = useState(room.addresses);

  useEffect(() => {
    const filteredAddresses = room.addresses.filter(address => address !== firstPlace && address !== secondPlace && address !== thirdPlace)
    setSelectableAddresses(filteredAddresses);
    return () => ''
  }, [firstPlace, secondPlace, thirdPlace])

  async function stop () {
    try {
      await roomsApi.stop(room.gameId, room.id, {
        address: account.address,
        roomId: room.id,
        firstPlace,
        secondPlace,
        thirdPlace
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
      okButtonProps={{ disabled: (!firstPlace || !secondPlace || !thirdPlace) }}
      onCancel={() => setIntendsToStop(false)}
      okText="End"
    >
      <div className="flex-c flex-column flex-jc-c fs-m">
        <div className="mb25">You are about to stop the game for <span className="fc-black ffm-bold">{room.name}</span>.</div>
        <div className="w100 mb15">
          <SelectInputField
            label="First place"
            value={firstPlace}
            setValue={setFirstPlace}
            options={selectableAddresses}
          />
        </div>
        <div className="w100 mb15">
          <SelectInputField
            label="Second place"
            value={secondPlace}
            setValue={setSecondPlace}
            options={selectableAddresses}
          />
        </div>
        <div className="w100 mb15">
          <SelectInputField
            label="Third place"
            value={thirdPlace}
            setValue={setThirdPlace}
            options={selectableAddresses}
          />
        </div>
      </div>
    </Modal>
  )
}
