import React, { useEffect } from 'react';
import { History } from 'history';
import { TextInputField } from '../../components/TextInputField';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/router/Router';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';

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

const LoginPageComponent: React.FC<ContainerProps> = ({ history, isAuthenticated }: ContainerProps) => {
  const {
    register,
    handleSubmit,
    errors
  } = useForm<LoginForm>();

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if(isAuthenticated) {
      history.push(ROUTES.HOME)
    }
  }, [isAuthenticated, history])

  function authenticate (data: LoginForm) {
    dispatch.session.authenticate({
      email: data.email,
      passphrase: data.passphrase
    });
  }

  return (
    <div className="w50 m-auto">
      <div className="mb50 flex-c flex-jc-c flex-column mt125">
        <h1 className="fs-xxl ffm-bold p0 m0">Welcome to <span className="fc-primary ffm-bold">Arcado</span></h1>
        <h2 className="fs-m fc-grey p0 m0">Sign in with a username and passphrase</h2>
      </div>

      <div className="mb25">
        <TextInputField
          label="Email"
          name="email"
          error={(errors.email || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: 'required'
              },
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
          error={(errors.passphrase || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: 'required'
              }
            })
          }
        />
      </div>
      <div className="flex-c">
        <div className="ml-auto">
          <Link to={ROUTES.INITIALISE}>
            <Button className="w175--fixed h45--fixed mr15">
              Create account
            </Button>
          </Link>
          <Button type="primary" className="w175--fixed h45--fixed" onClick={handleSubmit(authenticate)}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}

export const LoginPage = connect(
  mapStateToProps,
  null
)(LoginPageComponent)
