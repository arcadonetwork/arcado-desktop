import React, { useEffect, useState } from 'react';
import { getTransactionsByAddress } from '../../shared/api/transactions';
import { Loading } from '../../components/Loading';
import { AccountModel } from '../../models/account.model';
import { AccountDetailsTransactionsItem } from './AccountDetailsTransactionsItem';
import { isArrayWithElements } from '../../utils/type-checking';
import { AccountDetailsTransactionsNotFound } from './AccountDetailsTransactionsNotFound';
import { ApiResponseModel } from '../../models/api-response.model';
import { AssetModel } from '../../models/asset.model';


interface ContainerProps {
  account: AccountModel
}

export const AccountDetailsTransactions: React.FC<ContainerProps> = ({ account }) => {
  const [txResponse, setTxResponse] = useState<ApiResponseModel<AssetModel>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const response = await getTransactionsByAddress(account.address);
        setTxResponse(response);
        setLoading(false);
      } catch (e) {
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
        !isArrayWithElements(txResponse.data)
        ? <AccountDetailsTransactionsNotFound />
        : txResponse.data.map(
          (transaction, index) =>
            <AccountDetailsTransactionsItem
              key={index}
              transaction={transaction}
              isLastChild={index === txResponse.data.length - 1}
            />
        )
      }
    </>
  )
}
