import React, { useEffect, useState } from 'react';
import { getTransactionsByAddress } from '../../utils/api/transactions';
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
        console.log(data);
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
    </>
  )
}
