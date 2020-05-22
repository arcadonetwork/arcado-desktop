import React from 'react';
import { RoomDetailsPageParticipantsItem } from './RoomDetailsPageParticipantsItem';


interface ContainerProps {
  addresses: string[]
}

export const RoomDetailsPageParticipants: React.FC<ContainerProps> = ({ addresses }) => {
  return (
    <div>
      <div className="flex-c p15 br5 ffm-bold fs-s">
        <span className="w40 fc-black">Address</span>
      </div>
      <div className="bgc-white br br5">
        {
          addresses.map(
            (address, index) =>
              <RoomDetailsPageParticipantsItem
                key={address}
                address={address}
                isLastChild={index === addresses.length - 1}
              />
          )
        }
      </div>
    </div>
  )
}
