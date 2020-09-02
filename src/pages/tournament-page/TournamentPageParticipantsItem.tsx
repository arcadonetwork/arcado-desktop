import React from 'react';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';

interface ContainerProps {
  address: string,
  isLastChild: boolean
}

export const TournamentPageParticipantsItem: React.FC<ContainerProps> = ({ address, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  return (
    <div className={`flex-c p15 ${clazz}`}>
      <div className="mr15 arcado-avatar" >
        <LiskAvatar
          address={address}
          size="s"
        />
      </div>
      <span className="w40 fc-black">{address}</span>
    </div>
  )
}
