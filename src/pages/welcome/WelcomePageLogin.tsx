import React, { useEffect } from 'react';
import { Button } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';
import { ROUTES } from '../../shared/router/Router';
import { History } from 'history';
import { TextInputField } from '../../components/TextInputField';
import { useForm } from 'react-hook-form';

interface ContainerProps {
  isAuthenticated: boolean,
  history : History
}

const mapStateToProps = (state: iRootState) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
  }
}

type LoginForm = {
  email: string,
  passphrase: string
}

export const WelcomePageLoginComponent: React.FC<ContainerProps> = ({ isAuthenticated, history }: ContainerProps) => {
  const {
    register,
    handleSubmit
  } = useForm<LoginForm>();

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if(isAuthenticated) {
      history.push(ROUTES.HOME)
    }
  }, [isAuthenticated, history])

  function authenticate (data: LoginForm) {
    dispatch.session.authenticate(data.email, data.passphrase);
  }

  return (
    <>
      <div className="mb25">
        <TextInputField
          label="Email"
          name="email"
          reference={
            register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
              }
            })
          }
        />
      </div>
      <div className="mb50">
        <TextInputField
          label="Passphrase"
          name="passphrase"
          reference={
            register({
              required: true
            })
          }
        />
      </div>
      <div className="flex-c">
        <div className="ml-auto">
          <Button type="primary" onClick={handleSubmit(authenticate)}>
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
