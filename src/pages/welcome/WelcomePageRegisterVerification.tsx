import React, { useState } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store/store'
import { History } from 'history';
import Checkbox from 'antd/es/checkbox';
import AccountModel from '../../models/account.model';
import { ROUTES } from '../../shared/router/Router';
import { RouteComponentProps, withRouter } from 'react-router';

interface ContainerProps extends RouteComponentProps {
  history : History,
  account: AccountModel
}

const WelcomePageRegisterVerificationComponent: React.FC<ContainerProps> = ({ account, history }) => {

  const [hasSavedPassphrase, setHasSavedPassphrase] = useState(false);
  const dispatch = useDispatch<Dispatch>();

  async function saveAccount() {
    await dispatch.session.setAccount(new AccountModel(account))
    history.push(ROUTES.HOME)
  }

  return (
    <div className="flex-c flex-column mt50">
      <p className="w50 txt-ac">Thank you for registering. The following passphrase is now associated with your
        email. <span className="ffm-bold fc-black">Please, write down the passhrase.</span></p>

      <div className="mt25 mb25 p15 bgc-white br br5 br-c-primary w50">
        <div className="mb25">
          <div className="fs-n fc-black ffm-bold">Address</div>
          <div className="fc-black">{account.address}</div>
        </div>
        <div className="mb15">
          <div className="fs-n fc-black ffm-bold">Passphrase</div>
          <div className=" fc-black">{account.passphrase}</div>
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
};

export const WelcomePageRegisterVerification = withRouter(WelcomePageRegisterVerificationComponent);
