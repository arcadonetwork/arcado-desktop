import React, { useState } from 'react';
import { AccountModel } from '../../typings/account';


import { createRegisterGithubIDTransaction, GithubAccount } from '../../utils/hallar';
import { fetchAccountInfo } from '../../shared/api/accounts';

import { sendTransactions } from '../../shared/api/transactions';
import { MinusCircleOutlined, CheckCircleFilled } from '@ant-design/icons';
import { HallarSearchBar } from '../../components/hallar/HallarSearchBar';
import { Button, message } from 'antd';
import { isArrayWithElements, isObjectWithFields } from '../../utils/type-checking';
import { Avatar } from '../../components/avatar';
import { hallarClient } from '../../shared/api/hallar';


interface ContainerProps {
  account: AccountModel
}

const getIcon = (isAchieved: boolean) => {
  return isAchieved ? <CheckCircleFilled className="fc-green" /> : <MinusCircleOutlined className="fc-lgrey" />;
}

const getDelegateChecklistItem = (account: AccountModel) => {
  const isDelegate = !!account.dpos.delegate.username;

  return (
    <>
      <div className="mr10 fs-xm">
        {getIcon(isDelegate)}
      </div>
      {
        isDelegate
        ? (
            <div className="fc-black">
              <span className="mr5 fc-grey">Delegate username:</span>
              <span className="ffm-bold">{account.dpos.delegate.username}</span>
            </div>
          )
        :<span className="">no delegate account found</span>
      }

    </>
  )
}

const getGithubChecklistItem = (account: AccountModel, addGithubAccount: any) => {
  const hasGithubAccount = !!account.hallar?.github?.username;

  if (!account.dpos.delegate.username) {
    return <></>
  }

  return (
    <>
      <div className="mr10 fs-xm">
        {getIcon(hasGithubAccount)}
      </div>
      {
        !hasGithubAccount
        ? (
            <div className="flex-c ">
              <span className="mr5 fc-grey">No github account set.</span>
              <div onClick={() => addGithubAccount(true)} className="click fc-blue">Start here</div>
            </div>
          )
        :  <span className="fc-grey">no delegate account found</span>
      }
    </>
  )

}

export const SettingsPageHallarStart: React.FC<ContainerProps> = ({ account }) => {

  const [isAddingGithubAccount, addGithubAccount] = useState<boolean>(true);
  const [githubAccount, setGithubAccount] = useState<GithubAccount>();

  async function searchGithubAccounts (value: string) {
    return hallarClient.github.users(value);
  }

  async function submitGithubAccount () {
    try {
      // @ts-ignore
      const addressHex = account.address.toString('hex');
      const { sequence: { nonce } } = await fetchAccountInfo(addressHex);
      const tx = await createRegisterGithubIDTransaction(githubAccount, nonce, account.passphrase)
      await sendTransactions(tx);
      message.success('account is registered')
    } catch (e) {
      if (isArrayWithElements(e.errors)) {
        e.errors.map((item: any) => message.error(item.message))
      }
    }
  }

  return (
    <>
      <div className="mb25">
        <h3 className="ffm-bold fs-m">Hallar Settings</h3>
        <p className="w70 fc-grey mb25">Welcome to the hallar module. Hallar is built to give users a better understanding on how a delegate contributes to a blockchain. Hallar enables a close integration with your Github activity.</p>
        <p className="ffm-bold p0 m0 mb15">Prerequisites to get started with Hallar</p>

        <div className="flex-c mb10">
          {getDelegateChecklistItem(account)}
        </div>

        <div className="flex-c mb10">
          {getGithubChecklistItem(account, addGithubAccount)}
        </div>

      </div>

      {
        isAddingGithubAccount
        ? (
            <div className="p25 br br5 bgc-white">
              <div className="">
                <h4 className="fs-n ffm-bold p0 m0 mb5">Set Github Account</h4>
                <p className="fc-grey w70">The initial step in order to showcase your Github activity is to submit your Github account. This will enable us to verify who you are and which projects that you're involved in.</p>
                {
                  isObjectWithFields(githubAccount)
                    ? (
                      <div className="p10 bgc-xxl-grey flex-c br br50">
                        <div className="mr10">
                          <Avatar url={githubAccount.avatar_url} size="n" label={githubAccount.login} type="circle" />
                        </div>
                        <div className="w100">
                          <div className="fc-lb ffm-bold">{githubAccount.login}</div>
                          <div className="fc-grey fs-s">id: {githubAccount.id}</div>
                        </div>
                      </div>
                    )
                  : <HallarSearchBar
                      fieldLabel="login"
                      search={searchGithubAccounts}
                      onKeyPress={setGithubAccount}
                    />
                }
                <div className="w100 flex-c flex-jc-fe mt15">
                  <Button disabled={!isObjectWithFields(githubAccount)} ghost onClick={() => submitGithubAccount()} type="primary">Submit</Button>
                </div>
              </div>
            </div>
          )
        : ''
      }



    </>
  )

}
