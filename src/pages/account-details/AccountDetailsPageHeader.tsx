import React from 'react';
import AccountModel from '../../models/account.model';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { Button } from 'antd';
import { AccountDetailsPageHeaderItem } from './AccountDetailsPageHeaderItem';
import { getFormattedNumber } from '../../utils/numbers';

interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsPageHeader: React.FC<ContainerProps> = ({ account }) => {
  const details = [{
    label: "Balance",
    value: `${getFormattedNumber(account.balance)} LSK`
  },{
    label: "Win ratio",
    value: `${100}%`
  }];

  return (
    <div className="w100 flex-fs flex-column mb50 p15 br5 bgc-white">
      <div className="w100 flex-c mb25 pb15 br-b">
        <div className="mr25">
          <LiskAvatar address={account.address} size="n" />
        </div>
        <div>
          <div className="fs-m"><span className="ffm-bold fc-black">{account.address}</span></div>
          <div className="fs-s fc-grey">normal account</div>
        </div>
        <div className="ml-auto">
          <Button type="primary" disabled={true} className="h40--fixed w175--fixed">Send LSK</Button>
        </div>
      </div>
      <div className="flex-fs">
        {details.map((item, index) => <AccountDetailsPageHeaderItem item={item} isLastChild={index === details.length - 1} />)
        }
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
