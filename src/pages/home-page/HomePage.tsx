import React, { useEffect, useState } from 'react';
import { gamesApi } from '../../shared/services/games';
import { Loading } from '../../components/Loading';
import { message } from 'antd';
import { HomePageGames } from './HomePageGames';

interface ContainerProps {
}

const HomePage: React.FC<ContainerProps> = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const { games } = await gamesApi.getGames();
        setGames(games);
        setLoading(false);
      } catch (e) {
        message.error('can not load games')
        setLoading(false);
      }
    }
    fetchData();
    return () => ''
  }, []);

  return (
    <div>
      <h1>Browse Games</h1>
      {
        loading
        ? <Loading />
        : <HomePageGames games={games} />
      }
    </div>
  )
}

export default HomePage;
