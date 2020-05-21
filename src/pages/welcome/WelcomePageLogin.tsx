import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';
import { ROUTES } from '../../shared/router/Router';
import { History } from 'history';
import { TextInputField } from '../../components/TextInputField';

interface ContainerProps {
  isAuthenticated: boolean,
  history : History
}

const mapStateToProps = (state: iRootState) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
  }
}

export const WelcomePageLoginComponent: React.FC<ContainerProps> = ({ isAuthenticated, history }: ContainerProps) => {
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if(isAuthenticated) {
      history.push(ROUTES.HOME)
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="mb15">
        <TextInputField
          label="Email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="mb25">
        <TextInputField
          label="Passphrase"
          value={passphrase}
          onChange={setPassphrase}
        />
      </div>
      <div className="flex-c">
        <div className="ml-auto">
          <Button type="primary" onClick={() => dispatch.session.authenticate(email, passphrase)}>
            Sign in
          </Button>
        </div>
      </div>
    </>
  )
}

export const WelcomePageLogin = connect(
  mapStateToProps,
  null
)(WelcomePageLoginComponent)
