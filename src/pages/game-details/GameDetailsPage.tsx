import React, { useEffect, useState } from 'react';
import GameModel from '../../models/game.model';
import api from '../../shared/services/api';
import { message } from 'antd';
import local_games from '../../shared/utils/games.json';
import { Loading } from '../../components/Loading';
import { RouteComponentProps } from 'react-router';
import { GameDetailsPageHeader } from './GameDetailsPageHeader';
import { GameDetailsPageRooms } from './GameDetailsPageRooms';
import { GameDetailsPageMenu } from './GameDetailsPageMenu';

interface MatchParams {
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const GameDetailsPage: React.FC<ContainerProps> = ({ match }) => {

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
        const game = local_games.find((game) => game.id === gameId);
        setGame(game);
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
      <GameDetailsPageMenu />
      <GameDetailsPageRooms game={game} />
    </div>
  )
}
