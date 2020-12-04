import React, { useEffect, useState } from 'react';
import { AccountModel } from '../../typings/account';

import { PlusOutlined, FileUnknownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { SettingsPageHallarProjectsAdd } from './SettingsPageHallarProjectsAdd';
import { hallarClient } from '../../shared/api/hallar';
import { isArrayWithElements } from '../../utils/type-checking';


interface ContainerProps {
  account: AccountModel
}

export const SettingsPageHallarProjects: React.FC<ContainerProps> = ({ account }) => {

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [projects, setProjects] = useState<any[]>([]);

  async function getProjects () {
    try {
      const { data } = await hallarClient.projects.getByAddress({ address: account.address })
      console.log(data);
      setProjects(data || []);
    } catch (e) {

    }
  }

  useEffect(() => {
    getProjects();
  }, [account.address])

  function submit () {

  }

  return (
    <div className="mb25 pb25 br-b">
      <div className="flex-c flex-jc-sb mb10">
        <h3 className="fs-m fc-black ffm-bold p0 m0 lh-none">Projects</h3>
        <div className="ml-auto">
          <Button icon={<PlusOutlined />} onClick={() => setIsAdding(true)}>
            new
          </Button>
        </div>
      </div>
      {
        isArrayWithElements(projects)
        ? projects.map((item: any) => (
          <div className="mb15 p15-25">
            {JSON.stringify(item)}
          </div>
        ))
        : (
            <div className="p15-25 bgc-white flex-c flex-jc-c br br50 fc-grey">
              <div className="mr10">
                <FileUnknownOutlined />
              </div>
              <div>
                <span>No projects found</span>
              </div>
            </div>
          )
      }

      {
        isAdding
        ? <SettingsPageHallarProjectsAdd
            submit={submit}
            account={account}
            setIsAdding={setIsAdding}
            isAdding={isAdding}
          />
        : ''
      }
    </div>
  )
}
