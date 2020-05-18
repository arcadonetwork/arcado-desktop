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
      <div className="w100 h225--fixed bgc-lgrey mb10">
      </div>
      <span className="ffm-bold fc-black">{game.title}</span>
    </Link>
  )
}
