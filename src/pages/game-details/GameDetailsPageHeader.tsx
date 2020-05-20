import React, { useState } from 'react';
import GameModel from '../../models/game.model';
import { Button } from 'antd';
import { GameDetailsPageHeaderCreateRoom } from './GameDetailsPageHeaderCreateRoom';

interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageHeader: React.FC<ContainerProps> = ({ game }) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);
  return (
    <>
      <div className="flex-c mb50">
        <div className="bgc-lgrey h225--fixed w175--fixed mr50" />
        <div>
          <h1 className="ffm-bold">{game.title}</h1>
          <p>{game.description}</p>
          <Button onClick={(ev) => setIsCreatingRoom(true)} type="primary">Create room</Button>
        </div>
      </div>
      {
        isCreatingRoom
        ? <GameDetailsPageHeaderCreateRoom
            game={game}
            isCreatingRoom={isCreatingRoom}
            setIsCreatingRoom={(val: boolean) => setIsCreatingRoom(val)}
          />
        : <></>
      }
    </>
  )
}
