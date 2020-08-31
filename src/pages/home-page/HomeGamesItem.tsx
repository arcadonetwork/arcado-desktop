import React from 'react';
import { GameModel } from '../../models/game.model';
import { Link } from 'react-router-dom';
import { getGamesItemRoute } from '../../utils/router/Router';

interface ContainerProps {
  game: GameModel,
  index: number
}

export const HomeGamesItem: React.FC<ContainerProps> = ({ game, index }) => {
  const uri = getGamesItemRoute(game.id);
  return (
    <Link to={uri} className="br5">
      <div className="game-image br5 br w100 h200--fixed br-b mb15">
        <img className="br5" src={game.image} />
      </div>
      <div className="flex-c">
        <div className="img--30 bgc-lgrey circle mr15" />
        <span className="fc-black">{game.name}</span>
      </div>
    </Link>
  )
}
