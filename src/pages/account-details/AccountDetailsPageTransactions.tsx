import React, { useEffect, useState } from 'react';
import { usersApi } from '../../shared/services/users';
import { message } from 'antd';
import { Loading } from '../../components/Loading';
import AccountModel from '../../models/account.model';
import { AccountDetailsPageTransactionsItem } from './AccountDetailsPageTransactionsItem';


interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsPageTransactions: React.FC<ContainerProps> = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const { result } = await usersApi.getTransactions(account.address);
        setTransactions(result);
        setLoading(false);
      } catch (e) {
        message.error('can not load rooms')
        setTransactions([]);
        setLoading(false);
      }
    }
    fetchData();
    return () => ''
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      <div className="flex-c ffm-bold mb25 fc-black fs-s">
        <span className="w40">Name</span>
        <span className="w20">Bet (LSK)</span>
        <span className="w20">Players</span>
      </div>
      {
        transactions.map(
          (transaction, index) =>
            <AccountDetailsPageTransactionsItem
              key={transaction.address}
              transaction={transaction}
              isLastChild={index === transaction.length - 1}
            />
        )
      }
    </div>
  )
}
