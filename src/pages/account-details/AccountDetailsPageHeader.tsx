import React from 'react';
import AccountModel from '../../models/account.model';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { AccountDetailsPageHeaderItem } from './AccountDetailsPageHeaderItem';
import { PieChart } from 'react-minimal-pie-chart';

interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsPageHeader: React.FC<ContainerProps> = ({ account }) => {
  return (
    <div className="flex-c mb50 p15 br5 bgc-white br">
      <div className="mr50">
        <LiskAvatar address={account.address} size="xl" />
      </div>
      <div>
        <AccountDetailsPageHeaderItem
          label="Account"
          value={account.address}
        />
        <AccountDetailsPageHeaderItem
          label="Balance"
          value={`${account.balance || 0} LSK`}
        />
      </div>
      <div className="w50 ml-auto flex-c">
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
          <div>First place: <span className="ffm-bold">2</span></div>
          <div>Second place: <span className="ffm-bold">2</span></div>
          <div>Third place: <span className="ffm-bold">2</span></div>
        </div>
      </div>
    </div>
  )
}
