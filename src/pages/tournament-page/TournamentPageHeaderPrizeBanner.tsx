import React from 'react';
import { TournamentModel } from '../../models/tournament.model';
import { fromRawLsk } from '../../utils/lsk';
import { TournamentPageHeaderPrizeBannerItem } from './TournamentPageHeaderPrizeBannerItem';
import { ArrowRightOutlined } from '@ant-design/icons';
import { EndResultModel } from '../../models/end-result.model';
import { TournamentStateModel } from '../../models/tournament-state.model';
import { isObjectWithFields } from '../../utils/type-checking';

interface ContainerProps {
  tournament: TournamentModel,
  tournamentState: TournamentStateModel
}

const getCalculatedPrizeDistribution = (totalPricePool: number, percentage: number) => {
  return totalPricePool / 100 * percentage;
}

export const TournamentPageHeaderPrizeBanner: React.FC<ContainerProps> = ({ tournament, tournamentState }) => {
  const totalPricePool = Number(fromRawLsk(tournament.entryFee)) * tournament.maxPlayers;
  const endResult: EndResultModel = tournamentState.type === 4 ? tournamentState.endResult : undefined;

  return (
    <div className="w100 grid-col5 br50 br bgc-xxl-grey pt10 pb10 pl50 pr50">

      <div className="flex-c">
        <div className="flex-fs flex-column">
          <span className="fc-black ffm-bold">{totalPricePool} LSK</span>
          <span className="fc-grey fs-s">Total Prize Pool</span>
        </div>
        <div className="ml50">
          <ArrowRightOutlined className="fc-black" />
        </div>
      </div>

      <TournamentPageHeaderPrizeBannerItem
        label={isObjectWithFields(endResult) ? endResult.first : 'First Place'}
        value={getCalculatedPrizeDistribution(totalPricePool, tournament.distribution.first)}
        bgColor="bgc-gold"
      />

      <TournamentPageHeaderPrizeBannerItem
        label={isObjectWithFields(endResult) ? endResult.second : 'Second Place'}
        value={getCalculatedPrizeDistribution(totalPricePool, tournament.distribution.second)}
        bgColor="bgc-silver"
      />

      <TournamentPageHeaderPrizeBannerItem
        label={isObjectWithFields(endResult) ? endResult.third : 'Third Place'}
        value={getCalculatedPrizeDistribution(totalPricePool, tournament.distribution.third)}
        bgColor="bgc-bronze"
      />
    </div>
  )
}
