import React from 'react';
import GameModel from '../../models/game.model';

interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageHeader: React.FC<ContainerProps> = ({ game }) => {
  return (
    <div className="flex-c mb50">
      <div className="bgc-lgrey h225--fixed w175--fixed mr50" />
      <div>
        <h1 className="ffm-bold">{game.title}</h1>
        <p>{game.description}</p>
      </div>
    </div>
  )
}
