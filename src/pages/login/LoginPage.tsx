import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';
import { ROUTES } from '../../shared/router/Router';
import { RouteComponentProps } from 'react-router-dom';

interface ContainerProps extends RouteComponentProps {
  isAuthenticated: boolean
}

const mapStateToProps = (state: iRootState) => {
  return {
    isAuthenticated: state.authentication,
  }
}

export const LoginPageComponent: React.FC<ContainerProps> = ({ isAuthenticated, history }: ContainerProps) => {
  const [passphrase, setPassphrase] = useState('');
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if(isAuthenticated) {
      history.push(ROUTES.HOME)
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="mb25">
        <h1 className="fs-xl">Welcome to <span className="fc-primary ffm-bold">Arcado</span></h1>
        <p>We gamify your gaming experience</p>
      </div>

      <div className="mb10">
        <span>Passphrase</span>
      </div>
      <div className="mb10">
        <Input
          value={passphrase}
          onChange={(ev) => setPassphrase(ev.target.value)}
          className="arcado-passphrase"
        />
      </div>
      <div className="flex-c">
        <div className="ml-auto">
          <Button type="primary" onClick={() => dispatch({ type: 'authentication/authenticate', payload: passphrase })}>
            Sign in
          </Button>
        </div>
      </div>
    </>
  )
}

export const LoginPage = connect(
  mapStateToProps,
  null
)(LoginPageComponent)
