import React, { useState } from 'react';
import { GameModel } from '../../models/game.model';
import { Button } from 'antd';
import { GameDetailsPageHeaderCreateTournament } from './GameDetailsPageHeaderCreateTournament';
import { PageNavigation } from '../../components/PageNavigation';

interface ContainerProps {
  game: GameModel,
  page: string,
  menu: any
  setPage(page: string): void
}

export const GameDetailsPageHeader: React.FC<ContainerProps> = ({ game, page, menu, setPage }) => {
  const [isCreatingTournament, setIsCreatingTournament] = useState<boolean>(false);
  return (
    <div className="w100 bgc-xl-grey">
      <div className="grid-xl flex-fs flex-column">
        <div className="flex-c pt50 pb50">
          <div className="bgc-lgrey game-image img--150 mr50" >
            <img className="br5" src={game.image} />
          </div>
          <div className="w50">
            <div className="fs-l fc-black ffm-bold">{game.name}</div>
            <p className="w100">{game.description}</p>
          </div>
          <div className="ml-auto">
            <Button
              onClick={(ev) => setIsCreatingTournament(true)}
              type="primary"
              className="w175--fixed h45--fixed"
            >Create tournament</Button>
          </div>
        </div>
        <PageNavigation
          menu={menu}
          activePage={page}
          setPage={(page) => setPage(page)}
        />
      </div>
      <GameDetailsPageHeaderCreateTournament
        game={game}
        isCreatingTournament={isCreatingTournament}
        setIsCreatingTournament={(val: boolean) => setIsCreatingTournament(val)}
      />
    </div>
  )
}
