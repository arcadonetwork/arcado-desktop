import React, { useState } from 'react';
import GameModel from '../../models/game.model';
import { Button } from 'antd';
import { GameDetailsPageHeaderCreateRoom } from './GameDetailsPageHeaderCreateRoom';

interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageHeader: React.FC<ContainerProps> = ({ game }) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);
  return (
    <>
      <div className="flex-c mb50">
        <div className="bgc-lgrey game-image img--150 mr50" >
          <img className="br5" src={game.image} />
        </div>
        <div className="w50">
          <div className="fs-l fc-black ffm-bold">{game.name}</div>
          <p className="w100">{game.description}</p>
        </div>
        <div className="ml-auto">
          <Button
            onClick={(ev) => setIsCreatingRoom(true)}
            type="primary"
            className="w175--fixed h45--fixed"
          >Create room</Button>
        </div>
      </div>
      <GameDetailsPageHeaderCreateRoom
        game={game}
        isCreatingRoom={isCreatingRoom}
        setIsCreatingRoom={(val: boolean) => setIsCreatingRoom(val)}
      />
    </>
  )
}
