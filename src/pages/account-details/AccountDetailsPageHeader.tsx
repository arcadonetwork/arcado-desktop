import React from 'react';
import AccountModel from '../../models/account.model';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { AccountDetailsPageHeaderItem } from './AccountDetailsPageHeaderItem';
interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsPageHeader: React.FC<ContainerProps> = ({ account }) => {
  return (
    <div className="flex-fs mb50">
      <div className="mr50">
        <LiskAvatar address={account.address} size="xl" />
      </div>
      <div>
        <AccountDetailsPageHeaderItem
          label="Account"
          value={account.address}
        />
        <AccountDetailsPageHeaderItem
          label="Balance"
          value={`${account.balance} LSK`}
        />
      </div>
      <div className="ml-auto">

      </div>
    </div>
  )
}
