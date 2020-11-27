import React from 'react';
import { AccountModel } from '../../typings/account';

interface ContainerProps {
  account: AccountModel,
  isLastChild: boolean
  isVoting: boolean
  index: number
}

const SettingsPageDataExport: React.FC<ContainerProps> = ({ account }) => {
  return (
    <div className={`bgc-white bgc-grey__hover flex-c p15-25`}>
      {account.address}
    </div>
  )
}

export default SettingsPageDataExport;
