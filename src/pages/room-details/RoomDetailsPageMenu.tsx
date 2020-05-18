import React from 'react';

interface ContainerProps {
}

export const RoomDetailsPageMenu: React.FC<ContainerProps> = () => {
  return (
    <div className="flex-c br-b mb25 pb15">
      <div className="ml15 mr15">
        <span>Participants</span>
      </div>
    </div>
  )
}
