import React from 'react';
import GameModel from '../../models/game.model';
import Modal from 'antd/es/modal';
import { TextInputField } from 'src/components/TextInputField';
import { NumberInputField } from 'src/components/NumberInputField';
import { message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import { roomsApi } from '../../shared/services/rooms';
import { iRootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { getGameRoomItemRoute } from '../../shared/router/Router';

type DistributionData = {
  first: number;
  second: number;
  third: number;
}

type RoomData = {
  id: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  distribution: DistributionData
}

interface ContainerProps extends RouteComponentProps {
  game: GameModel,
  setIsCreatingRoom(val: boolean): any,
  isCreatingRoom: boolean
}

const GameDetailsPageHeaderCreateRoomComponent: React.FC<ContainerProps> = ({ game, isCreatingRoom, setIsCreatingRoom, history }) => {
  const {
    register,
    handleSubmit,
    errors
  } = useForm<RoomData>()

  const account = useSelector((state: iRootState) => state.session.account);

  if (!isCreatingRoom) {
    return <></>;
  }

  async function createRoom (roomData: RoomData) {
    try {
      const body = {
        ...roomData,
        address: account.address,
        passphrase: account.passphrase
      }
      const { room } = await roomsApi.createRoom(game.id, body);
      const uri = getGameRoomItemRoute(game.id, room.id);
      message.success('new room created');
      history.push(uri);
    } catch (e) {
      console.error(e);
      message.error('something went wrong');
      setIsCreatingRoom(false)
    }
  }

  return (
    <Modal
      visible={isCreatingRoom}
      onCancel={() => setIsCreatingRoom(false)}
      title={`${game.name} - Create room`}
      onOk={handleSubmit(createRoom)}
    >
      <div className="mb15">
        <TextInputField
          label="Name"
          name="name"
          placeholder="Noobs only!"
          reference={register}
        />
      </div>
      <div className="grid-col2 mb25">
        <NumberInputField
          label="Buyin"
          name="entryFee"
          reference={register}
          defaultValue={10}
        />
        <NumberInputField
          label="Players"
          name="maxPlayers"
          reference={register}
          defaultValue={3}
          min={3}
        />
      </div>
      <div>
        <div className="pb10 mb10 br-b flex flex-jc-sb">
          <span className="fc-black">Price Distribution</span>
          <span className="fc-red">
            {errors.distribution ?
              errors.distribution.first
                ? errors.distribution.first.message
                : errors.distribution.second
                ? errors.distribution.second.message
                : errors.distribution.third.message
              : ''
            }
          </span>
        </div>
        <p className="mb25 w70 fs-s">The distribution is calculated on percentages. Make sure that the the distribution equals 100% when saving.</p>
        <div className="grid-col3">
          <NumberInputField
            label="#1"
            name="distribution.first"
            reference={register}
          />
          <NumberInputField
            label="#2"
            name="distribution.second"
            reference={register}
          />
          <NumberInputField
            label="#3"
            name="distribution.third"
            reference={register}
          />
        </div>
      </div>
    </Modal>
  )
}

export const GameDetailsPageHeaderCreateRoom = withRouter(GameDetailsPageHeaderCreateRoomComponent);
