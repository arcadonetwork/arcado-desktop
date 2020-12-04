import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { AccountModel } from '../../typings/account';


interface ContainerProps {
  account: AccountModel
}

const AccountDetailsTransactions: React.FC<ContainerProps> = ({ account }) => {
  //const [txResponse, setTxResponse] = useState<ApiResponseModel<AssetModel[]>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    async function fetchData() {
      try {
        //const response = await getTransactionsByAddress(account.address);
        //setTxResponse(response);
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
      {/*<div className="flex-c ffm-bold pt10 pb10 fc-lb br-t br-b fs-s">
        <span className="w20">Tx Id</span>
        <span className="w15">Age</span>
        <span className="w20">From</span>
        <span className="w20">To</span>
        <span className="w15">Value</span>
      </div>*/}
      {/*{
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
      }*/}
      <div className="p15-25 w100 br5 bgc-white br flex-c flex-jc-c">
        <span className="fc-grey">Transactions not implemented</span>
      </div>
    </>
  )
}

export default AccountDetailsTransactions;
