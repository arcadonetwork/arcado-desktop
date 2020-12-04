import React from 'react';
import { AccountModel } from '../../typings/account';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import ICONS from '../../components/icons/IconLibrary';
import { Button } from 'antd';
import { getFormattedNumber } from '../../utils/numbers';

interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsHeader: React.FC<ContainerProps> = ({ account }) => {

  const isDelegate: boolean = !!account.dpos.delegate.username;
  const type = isDelegate ? 'Delegate account' : 'Regular account';

  return (
    <div className="w100 flex-fs flex-column mb50">
      <div className="w100 flex-c mb15 pb15 br-b">
        <div className="img--100 pos-rel mr25">
          <div className="pos-abs">
            <LiskAvatar address={account.address} size="l" />
          </div>
          {
            isDelegate
            ? (
                <div className="pos-abs pos-br">
                  <div className="circle bgc-white flex-c flex-jc-c">
                    <div className="img--30 circle m3 bgc-lblue fc-blue flex-c flex-jc-c">
                      <ICONS.DELEGATE />
                    </div>
                  </div>
                </div>
              )
            : ''
          }
        </div>
        <div>
          <div className="fs-xm ffm-bold fc-black p0 m0">{account.address}</div>
          <div className="flex-c">
            <div className="fc-grey fs-m p0 m0">{type}</div>
          </div>

        </div>
        <div className="ml-auto">
          <Button type="primary" disabled={true} className="h40--fixed w175--fixed">Send LSK</Button>
        </div>
      </div>

      <div className="w100 flex-c grid-col6">
        {
          isDelegate
          ? (
              <div className="flex-column flex-fs">
                <div className="fc-grey">Username</div>
                <div className="fs-m ffm-bold fc-black">{account.dpos.delegate.username}</div>
              </div>
            )
          : ''
        }
        <div className="flex-column flex-fs">
          <div className="fc-grey">Balance</div>
          <div className="fs-m ffm-bold fc-black">{getFormattedNumber(account.token.balance)} ARCD</div>
        </div>
      </div>
    </div>
  )
}
