import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const TransactionBroadcasted: React.FC = () => (
  <div className='flex-c flex-column flex-jc-c'>
    <div className="fs-xm">
      <LoadingOutlined />
    </div>
    <span className="mt25 txt-ac w50">Your transaction is successfully broadcasted. We are waiting for a confirmation</span>
  </div>
)
