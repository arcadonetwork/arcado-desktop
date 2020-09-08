import React from 'react';
import { AccountModel } from '../../models/account.model';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';

interface ContainerProps {
  account: AccountModel,
  selectedAccount: AccountModel,
  setAccount(account: AccountModel): void
}

export const InitialiseAccountItem: React.FC<ContainerProps> = ({ account, setAccount, selectedAccount }) => {
  const publicKey = account.publicKey;
  const shortenedPk = publicKey.substr(0,4) + '...' + publicKey.substr(publicKey.length - 2, publicKey.length)
  const clazz = (selectedAccount || {}).publicKey === publicKey ? ' br5 bgc-xxl-grey shadow br-c-primary' : 'br-c-trans';
  return (
    <div onClick={() => setAccount(account)} className={`flex-c br flex-column click p15-25 ${clazz}`}>
      <LiskAvatar
        address={account.address}
        size="m"
      />
      <div className="mt15">
        <span className="fc-lb">{shortenedPk}</span>
      </div>
    </div>
  )
}
