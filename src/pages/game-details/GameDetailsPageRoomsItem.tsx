import React from 'react';
import RoomModel from '../../models/room.model';
import { Link } from 'react-router-dom';
import { getGameRoomItemRoute } from '../../shared/router/Router';

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
      <span className="w20">{room.entryFee}</span>
      <span className="w20">{(room.addresses ||[]).length - 1} / {room.maxPlayers}</span>
    </div>
  )
}
