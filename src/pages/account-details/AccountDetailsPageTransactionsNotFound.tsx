import React from 'react';

interface ContainerProps {
}

export const AccountDetailsPageTransactionsNotFound: React.FC<ContainerProps> = () => (
  <div className="flex-c mb10 p15-25 br bgc-xxl-grey fc-lgrey br5">
      <span className="w40">
        No transactions found
      </span>
  </div>
)
