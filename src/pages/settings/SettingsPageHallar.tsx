import React from 'react';
import { AccountModel } from '../../typings/account';

interface ContainerProps {
  account: AccountModel,
  index: number
}

const SettingsPageHallar: React.FC<ContainerProps> = ({ account }) => {
  return (
    <>
      <div className="mb25">
        // GITHUB ACCOUNT VERIFICATION
      </div>
    </>
  )
}

export default SettingsPageHallar;
