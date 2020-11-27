import React from 'react';
import { AccountModel, Delegate } from '../../typings/account';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';

interface Props {
  delegate: Delegate
  account: AccountModel
}

export const SettingsPageNetworkDelegateModalVerification: React.FC<Props> = ({ delegate, account }) => {
  const cost = 25;
  return (
    <>
      <div className="mt25">
        <div className="flex-c w-auto fs-m p10 bgc-lblue br50 mb15">
          <div className="mr15 lh-none">
            <LiskAvatar address={account.address} size="s" />
          </div>
          <div>
            <div className="fc-black">{delegate.username}</div>
          </div>
        </div>
      </div>
      <div className="p15-25">
        <div className="flex-c flex-jc-sb fc-grey">
          <span>Current balance</span>
          <span>{account.token.balance} ARCD</span>
        </div>
        <div className="flex-c flex-jc-sb fc-grey pb10 mb10 br-b">
          <span>Cost "Register delegate"</span>
          <span className="fc-red ffm-bold">25 ARCD</span>
        </div>
        <div className="flex-c flex-jc-sb fc-black ffm-bold">
          <span>New balance</span>
          <span>{Number(account.token.balance) - cost} ARCD</span>
        </div>
      </div>
    </>
  )
}
