import React from 'react';
import { AccountModel } from '../../typings/account';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { Button } from 'antd';
import { getFormattedNumber } from '../../utils/numbers';

interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsHeader: React.FC<ContainerProps> = ({ account }) => {
  const delegateName: string = account.dpos.delegate.username;
  const walletName = delegateName && delegateName.length > 0 ? account.dpos.delegate.username : account.address;
  const secondaryWalletName = delegateName && delegateName.length > 0 ? account.address : '';
  return (
    <div className="w100 flex-fs flex-column mb50 p15 br5 ">
      <div className="w100 flex-c mb25 pb15 br-b">
        <div className="mr25">
          <LiskAvatar address={account.address} size="m" />
        </div>
        <div>
          <div className="fs-xm ffm-bold fc-black p0 m0">{walletName}</div>
          {
            secondaryWalletName
            ? <div className="fc-lgrey fs-m p0 m0">{secondaryWalletName}</div>
            : ''
          }

        </div>
        <div className="ml-auto">
          <Button type="primary" disabled={true} className="h40--fixed w175--fixed">Send LSK</Button>
        </div>
      </div>
      <div className="flex-fs">
        <div className={`flex-column flex-fs`}>
          <div className="fs-m fc-grey mb10">Balance</div>
          <div className="fs-xm ffm-bold fc-black">{getFormattedNumber(account.token.balance)} ARCD</div>
          <div className="fc-lgrey">~ 500 USD</div>
        </div>
      </div>

      {/*<div className="w50 ml-auto flex-c">
        <div className="pie-chart mr15">
          <PieChart
            data={[
              {
                color: '#E38627',
                value: account.win || 50
              },
              {
                color: '#06bbf1',
                value: account.loss || 50
              }
            ]}
          />
        </div>
        <div className="mr15">
          <div>First place: <span className="ffm-bold">0</span></div>
          <div>Second place: <span className="ffm-bold">0</span></div>
          <div>Third place: <span className="ffm-bold">0</span></div>
        </div>
      </div>*/}
    </div>
  )
}
