import React, { useState } from 'react';
import { AccountModel } from '../../typings/account';
import { message, Modal } from 'antd';

import { HallarSearchBar } from '../../components/hallar/HallarSearchBar';
import { isArrayWithElements, isObjectWithFields } from '../../utils/type-checking';
import { fetchAccountInfo } from '../../shared/api/accounts';
import { Avatar } from '../../components/avatar';
import { hallarClient } from '../../shared/api/hallar';


interface ContainerProps {
  account: AccountModel
  isAdding: boolean
  setIsAdding(val : boolean): void
  submit(projects : any): void
}

export const SettingsPageHallarProjectsAdd: React.FC<ContainerProps> = ({ account, isAdding, setIsAdding }) => {

  const [project, setProject] = useState<any>();

  async function setGithubAccount (project: any) {
    const pr = {
      id: project.id,
      fullName: project.full_name,
    }
    setProject(pr)
  }

  async function getGithubProjects (params: any) {
    return hallarClient.github.projects(params)
  }

  async function submitProject () {
    try {
      // @ts-ignore
      const addressHex = account.address.toString('hex');
      const { sequence: { nonce } } = await fetchAccountInfo(addressHex);
      await hallarClient.projects.create(project, nonce, account.passphrase);
      message.error('Succesfully registered')
      setIsAdding(false);
    } catch (e) {
      console.log(e);
      if (isArrayWithElements(e.errors)) {
        e.errors.map((item: any) => message.error(item.message))
      }
      setIsAdding(false);
    }
  }

  return (
    <Modal
      title="Add Projects"
      visible={isAdding}
      okText="Add"
      okButtonProps={{ disabled: !isObjectWithFields(project) }}
      onOk={() => submitProject()}
      onCancel={() => setIsAdding(false)}
    >
      <p className="mb15 fc-grey">Search for a Github repositories where you are contributing for this ecosystem. When entered, Hallar will automatically match your Github activity with the given repositories.</p>
      {
        isObjectWithFields(project)
        ? (
            <div className="p15-25 br bgc-white br flex-c">
              <Avatar
                size="s"
                type="circle"
                label={project.fullName}
              />
              <div>{project.fullName}</div>
            </div>
          )
        : (
            <div className="mb15 pb15 br-b">
              <HallarSearchBar
                fieldLabel="full_name"
                search={getGithubProjects}
                onKeyPress={setGithubAccount}
              />
            </div>
          )
      }
    </Modal>
  )
}
