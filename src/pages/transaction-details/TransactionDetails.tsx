import { RouteComponentProps } from 'react-router';
import React, { useEffect, useState } from 'react';
import { TransactionDetailsPropertyItem } from './TransactionDetailsPropertyItem';
import { Loading } from '../../components/Loading';
import { getTransactionById } from '../../utils/api/transactions';
import { getFormattedNumber } from '../../utils/numbers';
import TransactionModel from '../../models/transaction.model';
import { getFormattedDate } from '../../utils/dates';

interface MatchParams {
  txId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const TransactionDetails: React.FC<ContainerProps> = ({ match }) => {

  const { txId } = match.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<TransactionModel>(undefined);

  async function fetchTransaction () {
    const transactionModel = await getTransactionById(txId);
    setTransaction(transactionModel);
    setIsLoading(false);
  }

  useEffect(() => {
    return window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    fetchTransaction();
    return () => setIsLoading(true);
  }, [txId])

  if (isLoading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    )
  }

  return (
    <div className="grid mt75">
      <div className="w100 mb25 br-b pb25">
        <div className="fs-m lh-normal mb5 fc-grey">Transaction Details</div>
        <div className="fs-l lh-normal ffm-bold fc-black"> {txId}</div>
      </div>
      <div className="w50 flex-fs flex-column">
        <TransactionDetailsPropertyItem
          label="Tx Id"
          value={transaction.id}
        />
        <TransactionDetailsPropertyItem
          label="Age"
          value={getFormattedDate(transaction.timestamp)}
        />
        <TransactionDetailsPropertyItem
          label="From"
          value={transaction.senderId}
        />
        <TransactionDetailsPropertyItem
          label="To"
          value={transaction.asset.recipientId}
        />
        <TransactionDetailsPropertyItem
          label="Value"
          value={`${getFormattedNumber(transaction.asset.amount)} LSK`}
          isLastChild={true}
        />
      </div>
    </div>
  )
}

