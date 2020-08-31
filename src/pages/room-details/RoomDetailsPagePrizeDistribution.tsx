import React from 'react';
import { RoomModel } from '../../models/room.model';
import { fromRawLsk } from '../../utils/lsk';
import { RoomDetailsPagePrizeDistributionItem } from './RoomDetailsPagePrizeDistributionItem';

interface ContainerProps {
  room: RoomModel
}

const getCalculatedPrizeDistribution = (totalPricePool: number, percentage: number) => {
  return totalPricePool / 100 * percentage;
}

export const RoomDetailsPagePrizeDistribution: React.FC<ContainerProps> = ({ room }) => {
  const totalPricePool = room.maxPlayers * Number(fromRawLsk(room.entryFee));
  const isFinished = room.status === 2;
  return (
    <div className="br mb50 bgc-white br5">
      <div className="w100 flex-fs ">

        <RoomDetailsPagePrizeDistributionItem
          isLastChild={false}
          label={isFinished ? room.endResult.first : 'First Place'}
          value={getCalculatedPrizeDistribution(totalPricePool, room.distribution.first)}
          bgColor="bgc-gold"
        />

        <RoomDetailsPagePrizeDistributionItem
          isLastChild={false}
          label={isFinished ? room.endResult.second : 'Second Place'}
          value={getCalculatedPrizeDistribution(totalPricePool, room.distribution.second)}
          bgColor="bgc-silver"
        />

        <RoomDetailsPagePrizeDistributionItem
          isLastChild={true}
          label={isFinished ? room.endResult.third : 'Third Place'}
          value={getCalculatedPrizeDistribution(totalPricePool, room.distribution.third)}
          bgColor="bgc-bronze"
        />

      </div>
    </div>
  )
}
