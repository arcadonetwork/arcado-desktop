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
        const { result } = await roomsApi.getRooms(game.id);
        setRooms(result);
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
      <div className="flex-c ffm-bold mb25 fc-black fs-s">
        <span className="w40">Name</span>
        <span className="w20">Bet (LSK)</span>
        <span className="w20">Players</span>
      </div>
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
  )
}
