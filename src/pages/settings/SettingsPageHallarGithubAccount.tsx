import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { AccountModel } from '../../typings/account';


interface ContainerProps {
  account: AccountModel
}

export const SettingsPageHallarGithubAccount: React.FC<ContainerProps> = ({ account }) => {

  return (
    <div className="w100 mb25 pb15 br-b">
      <div className="w350--fixed flex-c pl5 pr25 pt5 pb5 br br50 bgc-white">
        <div className="img--50 bgc-lblue fc-blue flex-c flex-jc-c fs-l mr15">
          <GithubOutlined />
        </div>
        <div className="flex-fs flex-jc-c flex-column">
          <div className="fc-grey lh-normal">Github account</div>
          <div className="ffm-bold lh-normal fs-m fc-black">
            {account.hallar.github.username}
          </div>
        </div>
        <div className="ml-auto">
          <div className="fc-blue click">
            Edit
          </div>
        </div>
      </div>
    </div>
  )

}
