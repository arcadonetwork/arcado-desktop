import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../../components/Loading';
import { RoomDetailsPageHeader } from './RoomDetailsPageHeader';
import RoomModel from '../../models/room.model';
import api from '../../shared/services/api';
import local_room from '../../shared/utils/room.json';
import { message } from 'antd';
import { RoomDetailsPageMenu } from './RoomDetailsPageMenu';
import { RoomDetailsPageParticipants } from './RoomDetailsPageParticipants';

interface MatchParams {
  roomId: string;
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const RoomDetailsPage: React.FC<ContainerProps> = ({ match }) => {
  const [room, setRoom] = useState(new RoomModel(undefined));
  const [loading, setLoading] = useState(true);
  const { gameId, roomId } = match.params;

  useEffect( () => {
    async function fetchData() {
      try {
        const { result } = await api.getRoom(gameId, roomId);
        setRoom(result);
        setLoading(false);
      }catch (e) {
        message.error('Can not fetch room');
        setRoom(new RoomModel(local_room));
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
    <>
      <RoomDetailsPageHeader
        room={room}
      />
      <RoomDetailsPageMenu />
      <RoomDetailsPageParticipants participants={room.participants} />
    </>
  )
}
