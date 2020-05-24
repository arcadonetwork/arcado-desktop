import React from 'react';
import GameModel from '../../models/game.model';
import { Link } from 'react-router-dom';
import { getGamesItemRoute } from '../../shared/router/Router';

interface ContainerProps {
  game: GameModel,
  index: number
}

export const HomePageGamesItem: React.FC<ContainerProps> = ({ game, index }) => {
  const uri = getGamesItemRoute(game.id);
  return (
    <Link to={uri} className="mt50">
      <div className="bgc-lgrey game-image br5 w100 h150--fixed mb10">
        <img src={game.image} />
      </div>
      <span className="ffm-bold fc-black">{game.name}</span>
    </Link>
  )
}
