import React, { useEffect, useState } from 'react';
import api from '../../shared/services/api';
import { Loading } from '../../components/Loading';
import local_games from '../../shared/utils/games.json';
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
        const { result } = await api.getGames();
        setGames(result);
        setLoading(false);
      } catch (e) {
        message.error('can not load games')
        setGames(local_games);
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
