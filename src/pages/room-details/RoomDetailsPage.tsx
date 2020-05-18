import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../../components/Loading';

interface MatchParams {
  roomId: string;
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const RoomDetailsPage: React.FC<ContainerProps> = () => {
  //const [room, setRoom] = useState(new RoomModel(undefined));
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function fetchData() {
      setLoading(false);
    }
    fetchData();
    return () => ''
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      RoomDetailsPage
    </div>
  )
}
