import React, { useRef } from 'react';
import { TextInputField } from '../../components/TextInputField';
import _ from 'lodash';

interface Props {
  register: any,
  errors: any
  setError(field: string, obj: any): void
}

export const SettingsPageNetworkDelegateModalForm: React.FC<Props> = ({ errors, register, setError }) => {

  async function searchDelegateName (username: string) {
    try {

    } catch (e) {
      setError("username", {
        type: "manual",
        message: "Already taken."
      });
    }
  }

  const delayedQuery = useRef(_.debounce(q => searchDelegateName(q), 750)).current

  return (
    <>
      <div className="mb25 w100 fc-grey">
        <p className="">You will take on the responsibility of securing the network and processing all the transactions on Arcado’s blockchain network. Your username and server performance will be monitored closely. Make sure that you uphold the reputation associated with your username.</p>
      </div>
      <div className="">
        <TextInputField
          label="Username"
          name="username"
          placeholder="fe. satoshi_nakamoto"
          onChange={delayedQuery}
          error={(errors.username || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              minLength: {
                value: 3,
                message: "At least 3 chars."
              },
              pattern: {
                value: /^[a-z0-9!@$&_.]+$/i,
                message: 'Max. 20 characters, a-z, 0-1, no special characters except !@$_.'
              }
            })
          }
        />
      </div>
    </>
  )
}
