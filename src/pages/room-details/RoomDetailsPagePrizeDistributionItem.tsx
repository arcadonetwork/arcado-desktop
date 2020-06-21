import React from 'react';
import { Icon } from 'antd';

interface ContainerProps {
  label: string,
  value: number,
  bgColor: string,
  isLastChild: boolean
}

export const RoomDetailsPagePrizeDistributionItem: React.FC<ContainerProps> = ({ label, value, bgColor, isLastChild }) => {
  return (
    <div className={`w100 flex-c flex-jc-c fs-s p10 ${!isLastChild ? ' br-r': ''}`}>
      <div className={`flex-c flex-jc-c img--30 ${bgColor} fc-black mr15`}>
        <Icon type="trophy" />
      </div>
      <div className="flex flex-column">
        <div className="fc-black fs-s">{label}</div>
        <div className="fc-black ffm-bold">{value} LSK</div>
      </div>
    </div>
  )
}
