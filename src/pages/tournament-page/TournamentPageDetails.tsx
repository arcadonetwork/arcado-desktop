import React from 'react';
import { getFormattedNumber } from '../../utils/numbers';
import { fromRawLsk } from '../../utils/lsk';
import { TournamentModel } from '../../models/tournament.model';
import { GameModel } from '../../models/game.model';

interface ContainerProps {
  game: GameModel,
  tournament: TournamentModel
}

export const TournamentPageDetails: React.FC<ContainerProps> = ({ game, tournament }) => {
  return (
    <div className="mb50">
      <div className="w100 flex-c pt5 pb5 br-b">
        <div className="w20 fs-s">Game</div>
        <div className="w50 ffm-bold fc-black">{game.name}</div>
      </div>
      <div className="w100 flex-c pt5 pb5 br-b">
        <div className="w20 fs-s">Entry Fee</div>
        <div className="w50 ffm-bold fc-black">{getFormattedNumber(fromRawLsk(tournament.entryFee))} LSK</div>
      </div>
      <div className="w100 flex-c pt5 pb5">
        <div className="w20 fs-s">Hosted by</div>
        <div className="w50 ffm-bold fc-black">{tournament.createdBy}</div>
      </div>
    </div>
  )
}
