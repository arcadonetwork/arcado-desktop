import React from 'react';
import { RoomDetailsPageParticipantsItem } from './RoomDetailsPageParticipantsItem';


interface ContainerProps {
  addresses: string[]
}

export const RoomDetailsPageParticipants: React.FC<ContainerProps> = ({ addresses }) => {
  return (
    <div>
      <div className="flex-c ffm-bold mb25 fc-black fs-s">
        <span className="w40">Address</span>
        <span className="w20">Win/Loss Ratio</span>
        <span className="w20">Status</span>
      </div>
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
  )
}
