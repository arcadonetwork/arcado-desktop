import React from 'react';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { Link } from 'react-router-dom';
import { getAccountDetailsRoute } from '../../shared/router/Router';

interface ContainerProps {
  address: string,
  isLastChild: boolean
}

export const TournamentPagePlayersItem: React.FC<ContainerProps> = ({ address, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  return (
    <div className={`flex-c p15 ${clazz}`}>
      <div className="mr15 arcado-avatar" >
        <LiskAvatar
          address={address}
          size="s"
        />
      </div>
      <Link to={getAccountDetailsRoute(address)} className="w40 fc-grey">{address}</Link>
    </div>
  )
}
