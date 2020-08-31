import React from 'react';
import { RoomModel } from '../../models/room.model';
import { getGamesItemRoute } from '../../utils/router/Router';
import { Link } from 'react-router-dom';
import { RoomDetailsPageHeaderActions } from './RoomDetailsPageHeaderActions';
import { fromRawLsk } from '../../utils/lsk';

interface ContainerProps {
  room: RoomModel,
  refresh(): void
}

export const RoomDetailsPageHeader: React.FC<ContainerProps> = ({ room, refresh }) => {
  const gameUri = getGamesItemRoute(room.gameId);
  return (
    <div className="flex-c mb25">
      <div className="bgc-lgrey game-image img--150 mr50">
        <img className="br5"  src={room.game.image} />
      </div>

      <div>
        <Link to={gameUri} className="fc-lgrey">{room.game.name}</Link>
        <div className="fs-xl ffm-bold fc-black mb15">{room.name}</div>
        <div className="flex-fs">
          <div className="flex-c flex-jc-fe mr50">
            <div className="mr50">Buyin:{'  '}<span className="fc-black ffm-bold">{fromRawLsk(room.entryFee)} LSK</span></div>
            <div className="mr50">Players:{'  '}<span className="fc-black ffm-bold">{[].length} / {room.maxPlayers}</span></div>
          </div>
        </div>
      </div>

      <div className="ml-auto">
        <RoomDetailsPageHeaderActions
          room={room} refresh={refresh}
        />
      </div>

    </div>
  )
}
