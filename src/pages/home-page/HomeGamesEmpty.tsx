import React from 'react';

interface ContainerProps {
}

export const HomeGamesEmpty: React.FC<ContainerProps> = () => {
  return (
    <div className="">
      No games found
    </div>
  )
}
