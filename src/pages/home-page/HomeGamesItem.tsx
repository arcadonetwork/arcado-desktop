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
    <Link to={uri} className="bgc-xl-grey br5 shadow shadow__hover">
      <div className="game-image h150--fixed br5-top w100">
        <img className="br5-top bgc-white" src={game.image} />
        <div className="game-image-logo ml25 mt-minus15">
          <div className="br10 bgc-xl-grey flex flex-c flex-jc-c">
            <div className="img--40 bgc-white m5 br8" />
          </div>
        </div>
      </div>

      <div className="game-image-content pt35 pb25 pl25 pr25 br5-bottom flex-fs flex-column w100">
        <span className="fc-black ffm-bold">{game.name}</span>
      </div>
    </Link>
  )
}
