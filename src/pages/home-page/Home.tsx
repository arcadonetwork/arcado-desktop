import React, { useEffect } from 'react';
import { HomeGames } from './HomeGames';

interface ContainerProps {
}

const Home: React.FC<ContainerProps> = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ''
  }, [])

  return (
    <div className="grid-xl mt75">
      <div className="mb25">
        <div className="fs-l fc-black ffm-bold">Games</div>
      </div>
      <HomeGames />
    </div>
  )
}

export default Home;
