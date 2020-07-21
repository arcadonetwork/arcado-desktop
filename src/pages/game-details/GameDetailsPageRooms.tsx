import React, { useEffect, useState } from 'react';
import { getRooms } from '../../utils/api/rooms';
import { message } from 'antd';
import GameModel from '../../models/game.model';
import { Loading } from '../../components/Loading';
import { GameDetailsPageRoomsItem } from './GameDetailsPageRoomsItem';
import { isArrayWithElements } from '../../utils/utils/type-checking';
import RoomModel from '../../models/room.model';


interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageRooms: React.FC<ContainerProps> = ({ game }) => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const { rooms } = await getRooms(game.id);
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
          isArrayWithElements(rooms)
          ? rooms.map(
            (room, index) =>
              <GameDetailsPageRoomsItem
                key={room.id}
                gameId={game.id}
                room={room}
                isLastChild={index === rooms.length - 1}
              />
          )
            : (
              <div className="p15 flex-c br5 bgc-white">
                There are no rooms created for this game
              </div>
            )
        }
      </div>
    </div>
  )
}
