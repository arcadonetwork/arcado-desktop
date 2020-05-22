import React, { useState } from 'react';
import GameModel from '../../models/game.model';
import { Button } from 'antd';
import { GameDetailsPageHeaderCreateRoom } from './GameDetailsPageHeaderCreateRoom';

interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageHeader: React.FC<ContainerProps> = ({ game }) => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  return (
    <>
      <div className="flex-c mb50">
        <div className="bgc-lgrey img--150 mr50" />
        <div>
          <div className="fs-l fc-black ffm-bold">{game.name}</div>
          <p>{game.description}</p>
          <Button onClick={(ev) => setIsCreatingRoom(true)} type="primary">Create room</Button>
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
