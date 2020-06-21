import React from 'react';
import { Button, message } from 'antd';
import { TextInputField } from '../../components/TextInputField';
import { usersApi } from '../../shared/services/users';
import AccountModel from '../../models/account.model';
import { useForm } from "react-hook-form";
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store/store';
import { ROUTES } from '../../shared/router/Router';

interface ContainerProps {
  history: History
}

type UserData = {
  email: string
}

export const WelcomePageRegister: React.FC<ContainerProps> = ({ history }) => {

  const { register, handleSubmit, errors } = useForm<UserData>();
  const dispatch = useDispatch<Dispatch>();

  async function onSubmit (data: UserData) {
    try {
      const result = await usersApi.register(data.email);
      await dispatch.session.setAccount(new AccountModel(result))
      history.push(ROUTES.ACCOUNT_VERIFICATION)
    } catch (e) {
      message.error('something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="mb25">
        <TextInputField
          label="Email"
          name="email"
          error={(errors.email || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })
          }
        />
      </div>

      <div className="flex-c">
        <div className="ml-auto">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </div>
      </div>
    </form>
  )
}
