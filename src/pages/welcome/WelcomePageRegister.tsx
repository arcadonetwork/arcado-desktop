import React, { useState } from 'react';
import { Button, message } from 'antd';
import { TextInputField } from '../../components/TextInputField';
import { usersApi } from '../../shared/services/users';
import AccountModel from '../../models/account.model';
import { WelcomePageRegisterVerification } from './WelcomePageRegisterVerification';
import { useForm } from "react-hook-form";

interface ContainerProps {
}

type UserData = {
  email: string
}

export const WelcomePageRegister: React.FC<ContainerProps> = () => {

  const { register, handleSubmit, errors } = useForm<UserData>();

  const [account, setAccount] = useState(new AccountModel(undefined));
  const [isRegistered, setIsRegistered] = useState(false);

  async function onSubmit (data: UserData) {
    try {
      const result = await usersApi.register(data.email);
      setAccount(new AccountModel(result));
      setIsRegistered(true)
    } catch (e) {
      message.error('something went wrong')
    }
  }

  if (isRegistered) {
    return (
      <WelcomePageRegisterVerification
        account={account}
      />
    )
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
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
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
