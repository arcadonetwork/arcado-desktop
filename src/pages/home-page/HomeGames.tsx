import React, { useEffect, useState } from 'react';
import GameModel from '../../models/game.model';
import { isArrayWithElements } from '../../utils/utils/type-checking';
import { HomeGamesItem } from './HomeGamesItem';
import { HomeGamesEmpty } from './HomeGamesEmpty';
import { getGames } from '../../utils/api/games';
import { message } from 'antd';
import { Loading } from '../../components/Loading';

interface ContainerProps {
}

export const HomeGames: React.FC<ContainerProps> = () => {

  const [games, setGames] = useState<GameModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchGames() {
    try {
      const { games } = await getGames();
      setGames(games);
      setLoading(false);
    } catch (e) {
      message.error('can not load games')
      setLoading(false);
    }
  }

  useEffect( () => {
    fetchGames();
    return () => ''
  }, []);

  if (!isArrayWithElements(games)) {
    return (
      <HomeGamesEmpty />
    )
  }
  return (
    <div className="grid-games">
      {
        loading
          ? <Loading />
          : games.map((game, index) => <HomeGamesItem key={index} game={game} index={index} />)
      }
    </div>
  )
}
