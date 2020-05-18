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
    <div className={`mb10 fs-s flex-c mb10 pb15 ${clazz}`}>
      <span className="w40">
        <Link to={uri}>{room.title}</Link>
      </span>
      <span className="w20">{room.bet}</span>
      <span className="w20">{room.players}</span>
    </div>
  )
}
