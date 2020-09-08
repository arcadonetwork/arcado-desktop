import React from 'react';
import { Icon } from 'antd';

interface ContainerProps {
  label: string,
  value: number,
  bgColor: string
}

export const TournamentPageHeaderPrizeBannerItem: React.FC<ContainerProps> = ({ label, value, bgColor }) => {
  return (
    <div className="w100 flex-c fs-s">
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
