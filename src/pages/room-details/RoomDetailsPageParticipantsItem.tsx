import React from 'react';

interface ContainerProps {
  address: string,
  isLastChild: boolean
}

export const RoomDetailsPageParticipantsItem: React.FC<ContainerProps> = ({ address, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  return (
    <div className={`mb10 fs-s flex-c mb10 pb15 ${clazz}`}>
      <span className="w40">{address}</span>
    </div>
  )
}
