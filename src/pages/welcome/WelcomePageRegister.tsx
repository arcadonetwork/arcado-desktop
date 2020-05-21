import React, { useState } from 'react';
import { Button, message } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store'
import { History } from 'history';
import { TextInputField } from '../../components/TextInputField';
import Checkbox from 'antd/es/checkbox';
import { usersApi } from '../../shared/services/users';
import AccountModel from '../../models/account.model';
import { ROUTES } from '../../shared/router/Router';

interface ContainerProps {
  isAuthenticated: boolean,
  history : History
}

const mapStateToProps = (state: iRootState) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
  }
}

export const WelcomePageRegisterComponent: React.FC<ContainerProps> = ({ history }) => {

  const [email, setEmail] = useState('adfaadafsds');
  const [account, setAccount] = useState(new AccountModel(undefined));

  const [isRegistered, setIsRegistered] = useState(false);
  const [hasSavedPassphrase, setHasSavedPassphrase] = useState(false);
  const dispatch = useDispatch<Dispatch>();

  async function register () {
    try {
      const result = await usersApi.register(email);
      setAccount(new AccountModel(result));
      setIsRegistered(true)
    } catch (e) {
      message.error('something went wrong')
    }
  }

  async function saveAccount () {
    await dispatch.session.setAccount(new AccountModel(account))
    history.push(ROUTES.HOME)
  }

  if (isRegistered) {
    return (
      <div className="flex-c flex-column mt50">
        <p className="w50 txt-ac">Thank you for registering. The following passphrase is now associated with your email. <span className="ffm-bold fc-black">Please, write down the passhrase.</span></p>

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
          <Checkbox value={hasSavedPassphrase} onChange={() => setHasSavedPassphrase(!hasSavedPassphrase)}>I have written down the passphrase</Checkbox>
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

  return (
    <>

      <TextInputField
        label="Email"
        value={email}
        onChange={setEmail}
      />

      <div className="flex-c">
        <div className="ml-auto">
          <Button type="primary" onClick={() => register()}>
            Register
          </Button>
        </div>
      </div>
    </>
  )
}

export const WelcomePageRegister = connect(
  mapStateToProps,
  null
)(WelcomePageRegisterComponent)
