import React, { useEffect, useState } from 'react';
import { getTransactionsByAddress } from '../../utils/api/accounts';
import { Loading } from '../../components/Loading';
import AccountModel from '../../models/account.model';
import { AccountDetailsPageTransactionsItem } from './AccountDetailsPageTransactionsItem';
import { isArrayWithElements } from '../../utils/utils/type-checking';
import { AccountDetailsPageTransactionsNotFound } from './AccountDetailsPageTransactionsNotFound';


interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsPageTransactions: React.FC<ContainerProps> = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const { data } = await getTransactionsByAddress(account.address);
        setTransactions(data);
        setLoading(false);
      } catch (e) {
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
        !isArrayWithElements(transactions)
        ? <AccountDetailsPageTransactionsNotFound />
        : transactions.map(
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
