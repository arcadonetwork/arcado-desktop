import React, { useEffect, useState } from 'react';
import { roomsApi } from '../../shared/services/rooms';
import { message } from 'antd';
import GameModel from '../../models/game.model';
import { Loading } from '../../components/Loading';
import { GameDetailsPageRoomsItem } from './GameDetailsPageRoomsItem';


interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageRooms: React.FC<ContainerProps> = ({ game }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const { rooms } = await roomsApi.getRooms(game.id);
        setRooms(rooms);
        setLoading(false);
      } catch (e) {
        message.error('can not load rooms')
        setLoading(false);
      }
    }
    fetchData();
    return () => ''
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      <div className="flex-c p15 br5 ffm-bold fs-s">
        <span className="w40 fc-black">Name</span>
        <span className="w20">Buyin (LSK)</span>
        <span className="w20">Players</span>
      </div>
      <div className="bgc-white br br5">
        {
          rooms.map(
            (room, index) =>
              <GameDetailsPageRoomsItem
                key={room.id}
                gameId={game.id}
                room={room}
                isLastChild={index === rooms.length - 1}
              />
          )
        }
      </div>
    </div>
  )
}
