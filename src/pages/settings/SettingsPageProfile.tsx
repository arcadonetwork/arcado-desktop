import React from 'react';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { ForgerModel } from '../../typings/forger';
import { Checkbox } from 'antd';

interface ContainerProps {
  account: ForgerModel,
  isLastChild: boolean
  isVoting: boolean
  index: number
}

const SettingsPageProfile: React.FC<ContainerProps> = ({ account, isLastChild, index, isVoting }) => {
  const clazz = isLastChild ? '' : 'br-b';
  return (
    <div className={`bgc-white bgc-grey__hover flex-c p15-25 ${clazz}`}>

      {
        isVoting
        ? (
            <div className="w10">
              <Checkbox />
            </div>
          )
        : (
            <div className="w10 fc-lb">
              #{index + 1}
            </div>
          )
      }

      <div className="flex-c w40">
        <div className="mr25 lh-none m0 p0">
          <LiskAvatar
            address={account.address}
            size="s"
          />
        </div>
        <div className="">
          <span className="fc-blue">{account.username}</span>
        </div>
      </div>
    </div>
  )
}

export default SettingsPageProfile;
