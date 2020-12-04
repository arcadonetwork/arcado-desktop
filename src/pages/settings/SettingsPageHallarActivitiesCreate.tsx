import React, { useEffect, useState } from 'react';
import { AccountModel } from '../../typings/account';
import { Modal } from 'antd';

import { GithubActivity } from '../../utils/hallar';
import { HallarGithubActivity } from '../../components/hallar/HallarGithubActivity';
import { hallarClient } from '../../shared/api/hallar';

interface ContainerProps {
  account: AccountModel
  isAdding: boolean
  setIsAdding(val : boolean): void
}

export const SettingsPageHallarActivitiesCreate: React.FC<ContainerProps> = ({ account, isAdding, setIsAdding }) => {

  const [activities, setActivities] = useState<GithubActivity[]>([]);

  useEffect(() => {
    searchGithubAccounts()
  }, [account.hallar.github])

  async function searchGithubAccounts () {
    const data = await hallarClient.github.activity(account.hallar.github.username);
    console.log(data);
    setActivities(data);
  }

  return (
    <Modal
      title="Add activity"
      visible={isAdding}
      onCancel={() => setIsAdding(false)}
      width="750px"
    >
      {
        activities.map((item: GithubActivity) => <HallarGithubActivity activity={item} />)
      }
    </Modal>
  )
}
