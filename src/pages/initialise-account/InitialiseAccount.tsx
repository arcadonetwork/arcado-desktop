import React from 'react';
import { Button, Icon, message } from 'antd';
import { TextInputField } from '../../components/TextInputField';
import { useForm } from "react-hook-form";
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store/store';
import { ROUTES } from '../../utils/router/Router';
import { Link } from 'react-router-dom';
import { createAccount } from '../../utils/passphrase';

interface ContainerProps {
  history: History
}

type UserData = {
  email: string
}

const InitialiseAccount: React.FC<ContainerProps> = ({ history }) => {

  const { register, handleSubmit, errors } = useForm<UserData>();
  const dispatch = useDispatch<Dispatch>();

  async function onSubmit (data: UserData) {
    try {
      const result = await createAccount();
      await dispatch.accounts.setAccount(result)
      history.push(ROUTES.ACCOUNT_VERIFICATION)
    } catch (e) {
      console.error(e);
      message.error('something went wrong')
    }
  }

  return (
    <div className="w50 m-auto">

      <div className="mb50 flex-c flex-jc-c flex-column mt125">
        <h1 className="fs-xl ffm-bold p0 m0 mb10">Register a new account</h1>
        <h2 className="fs-m fc-grey p0 m0">Enter an email to proceed</h2>
      </div>

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
            <Link to={ROUTES.LOGIN} className="mr50">
              <Icon type="arrow-left" />
              <span className="ml10">Go Back</span>
            </Link>
            <Button type="primary" className="w175--fixed h45--fixed" htmlType="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default InitialiseAccount;
