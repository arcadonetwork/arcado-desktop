import React from 'react';
import { AccountModel } from '../../typings/account';
import { SettingsPageHallarGithubAccount } from './SettingsPageHallarGithubAccount';
import { SettingsPageHallarProjects } from './SettingsPageHallarProjects';
import { SettingsPageHallarStart } from './SettingsPageHallarStart';



interface ContainerProps {
  account: AccountModel,
  index: number
}

const SettingsPageHallar: React.FC<ContainerProps> = ({ account }) => {

  const isIntegrated = !!account.hallar?.github?.username;

  if (isIntegrated) {

  }

  return (
    <>
      {
        !isIntegrated
        ? <SettingsPageHallarStart account={account} />
        : (
            <>
              <SettingsPageHallarGithubAccount
                account={account}
              />
              <SettingsPageHallarProjects account={account} />
            </>
          )
      }
    </>
  )
}

export default SettingsPageHallar;
