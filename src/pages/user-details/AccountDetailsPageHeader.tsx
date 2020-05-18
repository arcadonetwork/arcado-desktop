import React from 'react';
import AccountModel from '../../models/account.model';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';

interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsPageHeader: React.FC<ContainerProps> = ({ account }) => {
  return (
    <div className="flex-c mb50">
      <div className="mr50">
        <LiskAvatar address={account.address} size="xl" />
      </div>
      <div>
        <h1 className="mb25 fs-l ffm-bold fc-black">
          {account.address}
        </h1>
      </div>
    </div>
  )
}
