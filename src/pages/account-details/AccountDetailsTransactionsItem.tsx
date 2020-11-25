import React from 'react';
/*import { TransactionModel } from '../../typings/transaction.model';
import { Link } from 'react-router-dom';
import { getAccountDetailsRoute, getTransactionDetailsRoute } from '../../shared/router/Router';
import { getFormattedNumber } from '../../utils/numbers';
import { getFormattedDate } from '../../utils/date-parsers';*/
import { AssetModel } from '../../typings/asset.model';

interface ContainerProps {
  transaction: AssetModel
  isLastChild: boolean
}

export const AccountDetailsTransactionsItem: React.FC<ContainerProps> = ({ transaction, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  return (
    <div className={`flex-c pb15 pt15 ${clazz}`}>
      {/*<span className="w20">
        <Link className="fc-blue" to={getTransactionDetailsRoute(transaction.id)}>{transaction.id}</Link>
      </span>
      <span className="w15">{getFormattedDate(transaction.timestamp)}</span>
      <span className="w20">
        <Link className="fc-blue" to={getAccountDetailsRoute(transaction.senderId)}>{transaction.senderId}</Link>
      </span>
      <span className="w20">
        <Link className="fc-blue" to={getAccountDetailsRoute(asset.recipientId)}>{asset.recipientId}</Link>
      </span>
      <span className="w15">{getFormattedNumber(asset.amount)} LSK</span>*/}
    </div>
  )
}
