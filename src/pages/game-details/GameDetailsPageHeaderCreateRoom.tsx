import React, { useState } from 'react';
import GameModel from '../../models/game.model';
import Modal from 'antd/es/modal';
import { TextInputField } from 'src/components/TextInputField';
import RoomModel from '../../models/room.model';
import { NumberInputField } from 'src/components/NumberInputField';
import PriceDistributionModel from '../../models/price-distribution.model';
import { roomsApi } from '../../shared/services/rooms';
import { message } from 'antd';
import { getGameRoomItemRoute } from '../../shared/router/Router';
import { RouteComponentProps, withRouter } from 'react-router';

interface ContainerProps extends RouteComponentProps {
  game: GameModel,
  setIsCreatingRoom(val: boolean): any,
  isCreatingRoom: boolean
}

const GameDetailsPageHeaderCreateRoomComponent: React.FC<ContainerProps> = ({ game, isCreatingRoom, setIsCreatingRoom, history }) => {
  const [room, setRoom] = useState(new RoomModel(undefined));
  const [distribution, setPriceDistribution] = useState(new PriceDistributionModel(undefined));

  if (!isCreatingRoom) {
    return <></>;
  }

  async function createRoom (room: RoomModel) {
    try {
      const { result } = await roomsApi.createRoom(game.id, room);
      const uri = getGameRoomItemRoute(game.id, result.id);
      message.success('new room created');
      history.push(uri);
    } catch (e) {
      message.error('something went wrong');
      setIsCreatingRoom(false)
    }
  }

  return (
    <Modal
      visible={isCreatingRoom}
      onCancel={() => setIsCreatingRoom(false)}
      title={`${game.title} - Create room`}
      onOk={() => {
        room.distribution = distribution;
        createRoom(room);
      }}
    >
      <div className="mb15">
        <TextInputField
          label="Name"
          name="name"
          reference={() => ''}
        />
      </div>
      <div className="grid-col2 mb25">
        <NumberInputField
          label="Buyin"
          onChange={(buyin: number) => setRoom({ ...room, buyin })}
          value={room.buyin}
        />
        <NumberInputField
          label="Players"
          onChange={(players: number) => setRoom({ ...room, players })}
          value={room.players}
        />
      </div>
      <div>
        <div className="pb10 mb10 br-b">
          <span className="fc-black">Price Distribution</span>
        </div>
        <div className="grid-col3">
          <NumberInputField
            label="#1"
            onChange={(first: number) => setPriceDistribution({ ...distribution, first })}
            value={distribution.first}
          />
          <NumberInputField
            label="#2"
            onChange={(second: number) => setPriceDistribution({ ...distribution, second })}
            value={distribution.second}
          />
          <NumberInputField
            label="#3"
            onChange={(third: number) => setPriceDistribution({ ...distribution, third })}
            value={distribution.third}
          />
        </div>
      </div>
    </Modal>
  )
}

export const GameDetailsPageHeaderCreateRoom = withRouter(GameDetailsPageHeaderCreateRoomComponent);
