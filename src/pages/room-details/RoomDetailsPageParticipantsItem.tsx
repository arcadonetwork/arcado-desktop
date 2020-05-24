import React from 'react';

interface ContainerProps {
  address: string,
  isLastChild: boolean
}

export const RoomDetailsPageParticipantsItem: React.FC<ContainerProps> = ({ address, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  return (
    <div className={`flex-c p15 ${clazz}`}>
      <span className="w40 fc-black">{address}</span>
    </div>
  )
}
