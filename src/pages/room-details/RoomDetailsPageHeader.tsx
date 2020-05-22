import React from 'react';
import RoomModel from '../../models/room.model';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { roomsApi } from '../../shared/services/rooms';
import { getGamesItemRoute } from '../../shared/router/Router';
import { Link } from 'react-router-dom';

interface ContainerProps {
  room: RoomModel,
  refresh(): void
}

export const RoomDetailsPageHeader: React.FC<ContainerProps> = ({ room, refresh }) => {
  const account = useSelector((state: iRootState) => state.session.account);
  const gameUri = getGamesItemRoute(room.gameId);

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
      <div className="bgc-lgrey img--150 mr50" />
      <div>
        <Link to={gameUri} className="fc-lgrey">{room.game.name}</Link>
        <div className="fs-xl ffm-bold fc-black mb10">{room.name}</div>
        <Button
          onClick={participate}
          type="primary"
        >
          Participate
        </Button>
      </div>
      <div className="ml-auto">

        <div className="pb10 mb10 br-b flex-fs">
          <div className="txt-ar">
            <div>Buyin</div>
            <div className="fc-black ffm-bold">{room.entryFee} LSK</div>
          </div>
          <div className="ml50 txt-ar">
            <div>Players</div>
            <div className="fc-black ffm-bold">{(room.addresses ||[]).length - 1} / {room.maxPlayers}</div>
          </div>
        </div>

        <div className="txt-ar">
          <div>Prize Distribution</div>
          <div className="flex-fs">
            <span className="fc-black ffm-bold">1. {room.distribution.first}%</span>
            <span className="ml5 mr5">|</span>
            <span className="fc-black ffm-bold">2. {room.distribution.second}%</span>
            <span className="ml5 mr5">|</span>
            <span className="fc-black ffm-bold">3. {room.distribution.third}%</span>
          </div>
        </div>

      </div>
    </div>
  )
}
