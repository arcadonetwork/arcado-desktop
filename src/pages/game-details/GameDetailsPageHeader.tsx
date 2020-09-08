import React from 'react';
import { GameModel } from '../../models/game.model';
import { PageNavigation } from '../../components/PageNavigation';
import { config } from '../../config';

interface ContainerProps {
  game: GameModel,
  page: string,
  menu: any
  setPage(page: string): void
}

export const GameDetailsPageHeader: React.FC<ContainerProps> = ({ game, page, menu, setPage }) => {
  return (
    <div className="w100 bgc-xl-grey">
      <div className="grid flex-fs flex-column">
        <div className="w100 flex-c pt25 pb25">
          <div className="bgc-lgrey game-image circle img--150 mr50" >
            <img className="br5 circle" src={config.IMAGE_PLACEHOLDER} />
          </div>
          <div className="w50">
            <div className="fs-l fc-black ffm-bold">{game.name}</div>
            <p className="w100">{game.description}</p>
          </div>
          <div className="ml-auto">

          </div>
        </div>
        <PageNavigation
          menu={menu}
          activePage={page}
          setPage={(page) => setPage(page)}
        />
      </div>
    </div>
  )
}
