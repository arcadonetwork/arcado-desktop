import React, { useEffect } from 'react';
import { HomeGames } from './HomeGames';
import { HomeRecentTournaments } from './HomeRecentTournaments';

interface ContainerProps {
}

const Home: React.FC<ContainerProps> = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ''
  }, [])

  return (
    <div className="grid-xl mt50">
      <HomeRecentTournaments />
      <HomeGames />
    </div>
  )
}

export default Home;
