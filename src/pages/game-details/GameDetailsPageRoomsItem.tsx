import React from 'react';
import RoomModel from '../../models/room.model';
import { Link } from 'react-router-dom';
import { getGameRoomItemRoute } from '../../shared/router/Router';
import { fromRawLsk } from '../../shared/utils/lsk';

interface ContainerProps {
  gameId: string,
  room: RoomModel,
  isLastChild: boolean
}

export const GameDetailsPageRoomsItem: React.FC<ContainerProps> = ({ gameId, room, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  const uri = getGameRoomItemRoute(gameId, room.id);
  return (
    <div className={`p15 flex-c br5 ${clazz}`}>
      <span className="w40">
        <Link to={uri} className="ffm-bold fc-black">{room.name}</Link>
      </span>
      <span className="w20">{fromRawLsk(room.entryFee)}</span>
      <span className="w20">{(room.addresses ||[]).length} / {room.maxPlayers}</span>
      <Link to={uri} className="ml-auto">enter</Link>
    </div>
  )
}
