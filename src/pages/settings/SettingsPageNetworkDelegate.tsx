import React, { useState } from 'react';
import { SafetyCertificateOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { AccountModel } from '../../typings/account';
import { SettingsPageNetworkDelegateModal } from './SettingsPageNetworkDelegateModal';

interface ContainerProps {
  account: AccountModel
}

const SettingsPageNetworkDelegate: React.FC<ContainerProps> = ({ account }) => {

  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  if (account.dpos.delegate.username) {
    return (
      <div className="">
        <h3 className="ffm-bold fs-n mb15">Delegate</h3>
        <div className="p15-25 bgc-white br br5 mb15 flex-c">
          <div className="mr15 fs-l p0 m0 fc-primary">
            <SafetyCertificateOutlined />
          </div>
          <div>
            <span className="fc-grey">Username: <span className="ml5 fc-black ffm-bold">{account.dpos.delegate.username}</span></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>

      <div className="">
        <h3 className="ffm-bold fs-n mb15">Delegate</h3>
        <div className="p15-25 bgc-white br br-c-primary mb15 flex-fs">
          <div className="mr15 fs-l p0 m0 fc-primary">
            <InfoCircleOutlined />
          </div>
          <div>
            <p className="w80 p0 m0 fc-grey mb5">In order to participate in the network, your account needs to be upgraded. By upgrading to become a delegate, a fee must be paid of <span className="ffm-bold fc-black">25 ARCD</span>.</p>
            <div>
              <span onClick={() => setIsRegistering(true)} className="fc-blue click">Start here</span>
            </div>
          </div>
        </div>
      </div>

      {
        isRegistering
          ? (
            <SettingsPageNetworkDelegateModal
              isRegistering={isRegistering}
              setIsRegistering={setIsRegistering}
            />
          )
          : ''
      }
    </>
  )
}

export default SettingsPageNetworkDelegate;
