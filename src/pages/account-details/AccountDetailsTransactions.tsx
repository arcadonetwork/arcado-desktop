import React, { useEffect, useState } from 'react';
import { getTransactionsByAddress } from '../../utils/api/transactions';
import { Loading } from '../../components/Loading';
import AccountModel from '../../models/account.model';
import { AccountDetailsTransactionsItem } from './AccountDetailsTransactionsItem';
import { isArrayWithElements } from '../../utils/utils/type-checking';
import { AccountDetailsTransactionsNotFound } from './AccountDetailsTransactionsNotFound';
import TransactionModel from '../../models/transaction.model';


interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsTransactions: React.FC<ContainerProps> = ({ account }) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const transactions = await getTransactionsByAddress(account.address);
        setTransactions(transactions);
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
    <>
      <div className="mb25">
        <h3 className="fs-m ffm-bold fc-black">Transactions</h3>
      </div>
      <div className="flex-c ffm-bold pt10 pb10 fc-lb br-t br-b fs-s">
        <span className="w20">Tx Id</span>
        <span className="w15">Age</span>
        <span className="w20">From</span>
        <span className="w20">To</span>
        <span className="w15">Value</span>
      </div>
      {
        !isArrayWithElements(transactions)
        ? <AccountDetailsTransactionsNotFound />
        : transactions.map(
          (transaction, index) =>
            <AccountDetailsTransactionsItem
              key={index}
              transaction={transaction}
              isLastChild={index === transactions.length - 1}
            />
        )
      }
    </>
  )
}
