import React, { useState } from 'react';
import { AccountModel } from '../../typings/account';

import { PlusOutlined, FileUnknownOutlined } from '@ant-design/icons';
import { SettingsPageHallarActivitiesCreate } from './SettingsPageHallarActivitiesCreate';
import { Button } from 'antd';


interface ContainerProps {
  account: AccountModel
}

export const SettingsPageHallarActivities: React.FC<ContainerProps> = ({ account }) => {

  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <>
      <div className="flex-c flex-jc-sb mb25">
        <h3 className="fs-xm fc-black ffm-bold p0 m0 lh-none">Activities</h3>
        <div className="ml-auto">
          <Button ghost icon={<PlusOutlined />} type="primary" onClick={() => setIsAdding(true)}>
            new
          </Button>
        </div>
      </div>
      <div className="p15-25 bgc-white flex-c flex-jc-c br br5 fc-grey">
        <div className="mr10">
          <FileUnknownOutlined />
        </div>
        <div>
          <span>No activities found</span>
        </div>
      </div>
      {
        isAdding
        ? <SettingsPageHallarActivitiesCreate
            account={account}
            setIsAdding={setIsAdding}
            isAdding={isAdding}
          />
        : ''
      }
    </>
  )
}
