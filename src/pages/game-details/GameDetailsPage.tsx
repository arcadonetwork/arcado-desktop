import React, { useEffect, useState } from 'react';
import GameModel from '../../models/game.model';
import api from '../../shared/services/api';
import { message } from 'antd';
import { Loading } from '../../components/Loading';
import local_game from '../../shared/utils/localGame.json';
import { RouteComponentProps } from 'react-router';
import { GameDetailsPageHeader } from './GameDetailsPageHeader';
import { GameDetailsPageRooms } from './GameDetailsPageRooms';
import { PageNavigation } from '../../components/PageNavigation';

interface MatchParams {
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

const menu = ['Rooms'];

export const GameDetailsPage: React.FC<ContainerProps> = ({ match }) => {
  const [page, setPage] = useState(menu[0]);
  const [game, setGame] = useState(new GameModel(undefined));
  const [loading, setLoading] = useState(true);
  const { gameId } = match.params;

  useEffect( () => {
    async function fetchData() {
      try {
        const { result } = await api.getGame(gameId);
        setGame(result);
        setLoading(false);
      } catch (e) {
        message.error('can not load games')
        setGame(new GameModel(local_game) );
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
      <GameDetailsPageHeader game={game} />
      <PageNavigation
        menu={menu}
        activePage={page}
        setPage={(page) => setPage(page)}
      />
      <GameDetailsPageRooms game={game} />
    </div>
  )
}
