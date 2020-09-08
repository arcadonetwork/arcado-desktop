import React from 'react';
import { GameModel } from '../../models/game.model';
import { Link } from 'react-router-dom';
import { getGamesItemRoute } from '../../shared/router/Router';
import { Avatar } from '../../components/avatar';
import { config } from '../../config';

interface ContainerProps {
  game: GameModel,
  index: number
}

export const HomeGamesItem: React.FC<ContainerProps> = ({ game, index }) => {
  const uri = getGamesItemRoute(game.gameId);
  return (
    <Link to={uri} className="game-item br5 br bgc-xl-grey">
      <div className="game-image h150--fixed br5-top w100">
        <img className="br5-top bgc-white" src={config.IMAGE_PLACEHOLDER} />
        <div className="game-image-logo ml25 mt-minus15">
          <div className="br8 bgc-xl-grey flex flex-c flex-jc-c">
            <Avatar
              size="n"
              type="rounded"
              className="game-avatar br8"
              label={game.name}
            />
          </div>
        </div>
      </div>

      <div className="game-image-content pt35 pb25 pl25 pr25 br5-bottom flex-fs flex-column w100">
        <span className="fc-black ffm-bold">{game.name}</span>
      </div>
    </Link>
  )
}
