import React from 'react';
import GameModel from '../../models/game.model';
import { isArrayWithElements } from '../../shared/utils/type-checking';
import { HomePageGamesItem } from './HomePageGamesItem';
import { HomePageGamesEmpty } from './HomePageGamesEmpty';

interface ContainerProps {
  games: GameModel[]
}

export const HomePageGames: React.FC<ContainerProps> = ({ games }) => {
  if (!isArrayWithElements(games)) {
    return (
      <HomePageGamesEmpty />
    )
  }
  return (
    <div className="grid-col5 flex-fs">
      {
        games.map((game, index) => <HomePageGamesItem key={index} game={game} index={index} />)
      }
    </div>
  )
}
