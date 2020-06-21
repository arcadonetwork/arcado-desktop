import React, { useState } from 'react';
import { Button } from 'antd';
import { History } from 'history';
import Checkbox from 'antd/es/checkbox';
import { ROUTES } from '../../shared/router/Router';
import { RouteComponentProps } from 'react-router';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';

interface ContainerProps extends RouteComponentProps {
  history : History
}

export const AccountVerificationPage: React.FC<ContainerProps> = ({ history }: ContainerProps) => {

  const [hasSavedPassphrase, setHasSavedPassphrase] = useState(false);
  const account = useSelector((state: iRootState) => state.session.account);

  async function saveAccount() {
    history.push(ROUTES.HOME)
  }

  return (
    <div className="flex-c flex-column mt50">
      <p className="w50 txt-ac">Thank you for registering. The following passphrase is now associated with your
        email. <span className="ffm-bold fc-black">Please, write down the passhrase.</span></p>

      <div className="w70 mt25 mb25 p50 bgc-white br br-c-primary w50">
        <div className="w100 mb15">
          <div className="fs-n ffm-bold">Public Key</div>
          <div className="fc-black">{account.publicKey}</div>
        </div>
        <div className="pb15 br-b mb15">
          <div className="fs-n ffm-bold">Address</div>
          <div className="fc-black">{account.address}</div>
        </div>
        <div className="">
          <div className="fs-n ffm-bold">Passphrase</div>
          <div className="fc-black fs-m">{account.passphrase}</div>
        </div>
      </div>

      <div className="mb25">
        <Checkbox value={hasSavedPassphrase} onChange={() => setHasSavedPassphrase(!hasSavedPassphrase)}>I have written
          down the passphrase</Checkbox>
      </div>
      <Button
        disabled={!hasSavedPassphrase}
        onClick={() => saveAccount()}
        type="primary">
        Start exploring
      </Button>
    </div>
  )
}
