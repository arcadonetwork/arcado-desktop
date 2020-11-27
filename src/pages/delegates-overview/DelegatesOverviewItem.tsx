import React from 'react';
import { Link } from 'react-router-dom';
import { getAccountDetailsRoute } from '../../shared/router/routes';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { ForgerModel } from '../../typings/forger';

interface ContainerProps {
  account: ForgerModel,
  isLastChild: boolean
  index: number
}

export const DelegatesOverviewItem: React.FC<ContainerProps> = ({ account, isLastChild, index }) => {
  const uri = getAccountDetailsRoute(account.address);
  const clazz = isLastChild ? '' : 'br-b';
  return (
    <Link to={uri} className={`bgc-white bgc-grey__hover flex-c p15-25 ${clazz}`}>
      <div className="w10 fc-lb">
        {index + 1}
      </div>

      <div className="br5-bottom flex-fs flex-column w20">
        <span className="fc-lb">{account.username}</span>
      </div>

      <div className="br5-bottom flex-c w40">
        <div className="mr25">
          <LiskAvatar
            address={account.address}
            size="s"
          />
        </div>
        <div className="fc-lb fc-blue__hover">{account.address}</div>
      </div>
    </Link>
  )
}
