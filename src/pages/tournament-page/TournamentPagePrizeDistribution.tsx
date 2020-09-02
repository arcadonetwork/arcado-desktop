import React from 'react';
import { TournamentModel } from '../../models/tournament.model';
import { fromRawLsk } from '../../utils/lsk';
import { TournamentPagePrizeDistributionItem } from './TournamentPagePrizeDistributionItem';

interface ContainerProps {
  tournament: TournamentModel
}

const getCalculatedPrizeDistribution = (totalPricePool: number, percentage: number) => {
  return totalPricePool / 100 * percentage;
}

export const TournamentPagePrizeDistribution: React.FC<ContainerProps> = ({ tournament }) => {
  const totalPricePool = tournament.maxPlayers * Number(fromRawLsk(tournament.entryFee));
  const isFinished = tournament.status === 2;
  return (
    <div className="br mb50 bgc-white br5">
      <div className="w100 flex-fs ">

        <TournamentPagePrizeDistributionItem
          isLastChild={false}
          label={isFinished ? tournament.endResult.first : 'First Place'}
          value={getCalculatedPrizeDistribution(totalPricePool, tournament.distribution.first)}
          bgColor="bgc-gold"
        />

        <TournamentPagePrizeDistributionItem
          isLastChild={false}
          label={isFinished ? tournament.endResult.second : 'Second Place'}
          value={getCalculatedPrizeDistribution(totalPricePool, tournament.distribution.second)}
          bgColor="bgc-silver"
        />

        <TournamentPagePrizeDistributionItem
          isLastChild={true}
          label={isFinished ? tournament.endResult.third : 'Third Place'}
          value={getCalculatedPrizeDistribution(totalPricePool, tournament.distribution.third)}
          bgColor="bgc-bronze"
        />

      </div>
    </div>
  )
}
