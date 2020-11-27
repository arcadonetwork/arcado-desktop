import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';
import { AccountModel } from '../../typings/account';
import SettingsPageNetworkDelegate from './SettingsPageNetworkDelegate';

interface ContainerProps {
  account: AccountModel,
  index: number
}

const SettingsPageNetwork: React.FC<ContainerProps> = ({ account }) => {
  return (
    <>

      <div className="pb15 mb25 br-b">
        <h2 className="ffm-bold fs-m mb10">Network Settings</h2>
        <p className="w80 fc-grey mb15">Arcado is a blockchain which means that the entire infrastructure is run by users just like you. You can help by registering your account as a delegate, sharing compute power and contributing to the community.</p>
        <p className="fc-grey">Read a more detailed overview <Link className="fc-blue" to={ROUTES.SETTINGS}>here</Link>.</p>
      </div>

      <SettingsPageNetworkDelegate
        account={account}
      />
    </>
  )
}

export default SettingsPageNetwork;
