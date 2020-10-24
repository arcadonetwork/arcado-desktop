import React, { useEffect } from 'react';
import { GamesOverview } from './GamesOverview';

interface ContainerProps {
}

const Games: React.FC<ContainerProps> = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ''
  }, [])

  return (
    <div className="grid-xl mt50 mb200">
      <GamesOverview />
    </div>
  )
}

export default Games;
