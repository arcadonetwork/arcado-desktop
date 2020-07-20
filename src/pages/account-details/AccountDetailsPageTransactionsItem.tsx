import React from 'react';
import TransactionModel from '../../models/transaction.model';
import { fromRawLsk } from '../../utils/utils/lsk';
import { Link } from 'react-router-dom';
import { getAccountDetailsRoute, getTransactionDetailsRoute } from '../../utils/router/Router';
import { getFormattedNumber } from '../../utils/numbers';

interface ContainerProps {
  transaction: TransactionModel,
  isLastChild: boolean
}

export const AccountDetailsPageTransactionsItem: React.FC<ContainerProps> = ({ transaction, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  const amount = fromRawLsk(Number(transaction.amount));
  return (
    <div className={`fs-s flex-c pb15 pt15 ${clazz}`}>
      <span className="w20">
        <Link className="fc-blue" to={getTransactionDetailsRoute(transaction.id)}>{transaction.id}</Link>
      </span>
      <span className="w15">{transaction.timestamp}</span>
      <span className="w20">
        <Link className="fc-blue" to={getAccountDetailsRoute(transaction.recipientId)}>{transaction.recipientId}</Link>
      </span>
      <span className="w20">
        <Link className="fc-blue" to={getAccountDetailsRoute(transaction.senderId)}>{transaction.senderId}</Link>
      </span>
      <span className="w15">{getFormattedNumber(amount)} LSK</span>
    </div>
  )
}
