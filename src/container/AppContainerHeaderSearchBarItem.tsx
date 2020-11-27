import React from 'react'
import { getGamesItemRoute } from '../shared/router/routes';
import { GameModel } from '../typings/game.model';

interface ContainerProps {
  item: GameModel,
  navigate(uri: string): void
}

const NAME_LIMIT = 40

export const AppContainerHeaderSearchBarItem: React.FC<ContainerProps> = ({ item, navigate }) => {
  function renderName(name: string) {
    if (name && name.length > NAME_LIMIT) {
      name = `${name.substring(0, NAME_LIMIT)}..`
    }
    return name
  }

  const uri = getGamesItemRoute(item.id)
  return (
    <div
      onMouseDown={() => navigate(uri)}
      className="w100 h100 flex flex-jc-fs flex-ai-c p5">
      <span className="w85 color-lb fs-m">{renderName(item.name)}</span>
    </div>
  )
}
