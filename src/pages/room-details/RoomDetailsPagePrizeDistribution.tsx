import React from 'react';
import RoomModel from '../../models/room.model';
import { Icon } from 'antd';

interface ContainerProps {
  room: RoomModel
}

const getCalculatedPrizeDistribution = (totalPricePool: number, percentage: number) => {
  return totalPricePool / 100 * percentage;
}

export const RoomDetailsPagePrizeDistribution: React.FC<ContainerProps> = ({ room }) => {
  const totalPricePool = room.maxPlayers * room.entryFee;
  return (
    <div className="br mb50 bgc-white br5">
      <div className="flex-fs ">

        <div className="w100 flex-c flex-jc-c fs-s p10 br-r">
          <div className="flex-c flex-jc-c img--30 bgc-gold fc-black mr15">
            <Icon type="trophy" />
          </div>
          <div className="flex flex-column">
            <div className="fc-black fs-s">First Place</div>
            <div className="fc-black ffm-bold">{getCalculatedPrizeDistribution(totalPricePool, room.distribution.first)} LSK</div>
          </div>
        </div>

        <div className="w100 flex-c flex-jc-c fs-s p10 br-r">
          <div className="flex-c flex-jc-c img--30 bgc-silver fc-black mr15">
            <Icon type="trophy" />
          </div>
          <div className="flex flex-column">
            <div className="fc-black fs-s">Second Place</div>
            <div className="fc-black ffm-bold">{getCalculatedPrizeDistribution(totalPricePool, room.distribution.second)} LSK</div>
          </div>
        </div>

        <div className="w100 flex-c flex-jc-c fs-s p10">
          <div className="flex-c flex-jc-c img--30 bgc-bronze fc-black mr15">
            <Icon type="trophy" />
          </div>
          <div className="flex flex-column">
            <div className="fc-black fs-s">Third Place</div>
            <div className="fc-black ffm-bold">{getCalculatedPrizeDistribution(totalPricePool, room.distribution.third)} LSK</div>
          </div>
        </div>

      </div>
    </div>
  )
}
