import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

export const TransactionFound: React.FC = () => (
  <div className='flex-c flex-column'>
    <div className="fs-xm">
      <CheckCircleOutlined />
    </div>
    <div className="flex-c flex-column mt15">
      <span className="ml10">Found your transaction!</span>
    </div>
  </div>
)
