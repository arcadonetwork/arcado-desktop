import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../../components/Loading';
import { RoomDetailsPageHeader } from './RoomDetailsPageHeader';
import RoomModel from '../../models/room.model';
import { roomsApi } from '../../shared/services/rooms';
import { message } from 'antd';
import { RoomDetailsPageParticipants } from './RoomDetailsPageParticipants';
import { PageNavigation } from '../../components/PageNavigation';
import { gamesApi } from '../../shared/services/games';

const menu = [
  'Participants'
]

interface MatchParams {
  roomId: string;
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const RoomDetailsPage: React.FC<ContainerProps> = ({ match }) => {
  const [room, setRoom] = useState(new RoomModel(undefined));
  const [page, setPage] = useState(menu[0]);
  const [loading, setLoading] = useState(true);
  const { gameId, roomId } = match.params;

  async function getRoomDetails () {
    try {
      const [{ room }, { game }] = await Promise.all([
        roomsApi.getRoom(gameId, roomId),
        gamesApi.getGame(gameId)
      ])
      room.game = game;
      setRoom(room);
      setLoading(false);
    }catch (e) {
      message.error('Can not fetch room');
      setLoading(false);
    }
  }

  useEffect( () => {
    getRoomDetails();
    return () => ''
  }, []);

  async function refresh () {
    await setLoading(true);
    getRoomDetails();
  }

  if(loading) {
    return <Loading />
  }

  return (
    <>
      <RoomDetailsPageHeader
        refresh={refresh}
        room={room}
      />
      <PageNavigation
        menu={menu}
        activePage={page}
        setPage={(page) => setPage(page)}
      />
      <RoomDetailsPageParticipants
        addresses={room.addresses}
      />
    </>
  )
}
