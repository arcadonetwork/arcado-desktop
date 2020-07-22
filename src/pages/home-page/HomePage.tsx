import React, { useEffect, useState } from 'react';
import { getGames } from '../../utils/api/games';
import { Loading } from '../../components/Loading';
import { message } from 'antd';
import { HomePageGames } from './HomePageGames';
import GameModel from '../../models/game.model';

interface ContainerProps {
}

const HomePage: React.FC<ContainerProps> = () => {
  const [games, setGames] = useState<GameModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
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
    fetchData();
    return () => ''
  }, []);

  return (
    <div className="grid mt75">
      <div className="mb50">
        <div className="fs-xl fc-black ffm-bold">Browse Games</div>
        <p>Gamify your multiplayer matches by betting on a game you are about to start</p>
      </div>
      {
        loading
        ? <Loading />
        : <HomePageGames games={games} />
      }
    </div>
  )
}

export default HomePage;
