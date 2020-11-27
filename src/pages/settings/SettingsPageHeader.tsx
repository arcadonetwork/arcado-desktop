import React from 'react'
import { AccountModel } from '../../typings/account';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';

interface Props {
  account: AccountModel
}

export const ProfileSettingsPageHeader: React.FC<Props> = ({ account }) => {
  const title = account.dpos.delegate.username ? account.dpos.delegate.username : account.address;
  const subTitle = account.dpos.delegate.username ? `Address: ${account.address}` : undefined;
  return (
    <div className="w100 flex-c mb50">
      <div className="mr50">
        <LiskAvatar address={account.address} size="l" />
      </div>
      <div className="flex-fs flex-column">
        <h1 className="p0 m0 color-lb fs-xm ffm-bold">{title}</h1>
        {
          subTitle
          ? (<span className="fc-grey fs-n">{subTitle}</span>)
            : ''
        }

      </div>
    </div>
  )
}
