import React from 'react';
import GameModel from '../../models/game.model';
import { Link } from 'react-router-dom';
import { getGamesItemRoute } from '../../utils/router/Router';

interface ContainerProps {
  game: GameModel,
  index: number
}

export const HomeGamesItem: React.FC<ContainerProps> = ({ game, index }) => {
  const uri = getGamesItemRoute(game.id);
  return (
    <Link to={uri} className=" br5 br shadow shadow__hover">
      <div className="game-image br5-top w100 h150--fixed br-b">
        <img className="br5-top" src={game.image} />
      </div>
      <div className="p25 flex-fs">
        <div className="img--30 bgc-lgrey circle mr15" />
        <div className="flex-fs flex-column">
          <span className="ffm-bold fc-black">{game.name}</span>
          <span className="fc-grey">{0} games played</span>
        </div>
      </div>
    </Link>
  )
}
