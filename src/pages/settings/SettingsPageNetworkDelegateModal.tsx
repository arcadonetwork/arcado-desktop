import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { Delegate } from '../../typings/account';
import { SettingsPageNetworkDelegateModalForm } from './SettingsPageNetworkDelegateModalForm';
import { SettingsPageNetworkDelegateModalVerification } from './SettingsPageNetworkDelegateModalVerification';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { registerDelegate } from '../../shared/api/delegates';
import { isArrayWithElements } from '../../utils/type-checking';

interface Props {
  isRegistering: boolean
  setIsRegistering(isRegistering: boolean): void
}

export const SettingsPageNetworkDelegateModal: React.FC<Props> = ({ isRegistering, setIsRegistering }) => {

  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue
  } = useForm<Delegate>()

  const account = useSelector((state: iRootState) => state.account.account);

  const [isConfirming, setIsConfirming] = useState<boolean>();
  const [delegate, setDelegate] = useState<Delegate>();

  function setDataOnDelegate (data: Delegate) {
    setDelegate(data);
    setIsConfirming(true);

  }

  async function editUsername () {
    await setIsConfirming(false)
    setValue('username', delegate.username)
  }

  async function registerAfterConfirmation () {
    try {
      await registerDelegate(delegate.username, account.passphrase);
      message.error('Succesfully registered')
      setIsRegistering(false);
    } catch (e) {
      console.log(e);
      if (isArrayWithElements(e.errors)) {
        e.errors.map((item: any) => message.error(item.message))
      }
      setIsRegistering(false);
    }
  }

  const footerRegister = (
    <div className="flex-c flex-jc-fe mr5">
      <Button onClick={handleSubmit(setDataOnDelegate)} type="primary" className="">Confirm</Button>
    </div>
  )

  const footerVerification = (
    <div className="flex-c flex-jc-fe mr5">
      <div onClick={() => editUsername()} className="fc-grey mr25 click fc-blue__hover">Go back</div>
      <Button onClick={() => registerAfterConfirmation()} type="primary" className="">Register</Button>
    </div>
  )

  return (
    <Modal
      title={null}
      visible={isRegistering}
      onOk={register}
      onCancel={() => setIsRegistering(false)}
      footer={isConfirming ? footerVerification : footerRegister}
    >
      <div className="mt50 mb10">
        <h3 className="ffm-bold fs-m">Register username</h3>
      </div>
      {
        isConfirming
        ? <SettingsPageNetworkDelegateModalVerification
            account={account}
            delegate={delegate}
          />
        : <SettingsPageNetworkDelegateModalForm
            register={register}
            errors={errors}
            setError={setError}
          />
      }
    </Modal>
  )
}
