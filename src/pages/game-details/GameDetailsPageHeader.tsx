import React from 'react';
import { GameModel } from '../../models/game.model';
import { PageNavigation } from '../../components/PageNavigation';

import { Avatar } from '../../components/avatar';

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
          <div className="bgc-lgrey br8 img--125 mr50" >
            <Avatar
              size="xl"
              type="circle"
              className="bgc-white"
              label={game.name}
            />
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
