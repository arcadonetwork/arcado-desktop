import React from 'react';
import TransactionModel from '../../models/transaction.model';

interface ContainerProps {
  transaction: TransactionModel,
  isLastChild: boolean
}

export const AccountDetailsPageTransactionsItem: React.FC<ContainerProps> = ({ transaction, isLastChild }) => {
  const clazz = !isLastChild ? 'br-b' : ''
  return (
    <div className={`mb10 fs-s flex-c mb10 pb15 ${clazz}`}>
      <span className="w40">
        {transaction.id}
      </span>
      <span className="w20"></span>
      <span className="w20"></span>
    </div>
  )
}
