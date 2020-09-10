import React from 'react';
import { QuestionOutlined } from '@ant-design/icons';

interface ContainerProps {
  address: string;
}

export const AccountDetailsNotFound: React.FC<ContainerProps> = ({ address }) => {
  return (
    <div className="grid mt50">
      <div className="flex-c w100 mb25 pb15 br-b">
        <div className="img--50 bgc-lgrey flex-c flex-jc-c">
          <QuestionOutlined />
        </div>
        <div className="ml25 fs-m">
          <span className="ffm-bold fc-black">{address}</span>
        </div>
      </div>
      <div>
        This address has either not been used yet or you have given an invalid address.
      </div>
    </div>
  )
}
