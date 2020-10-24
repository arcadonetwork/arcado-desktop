import * as React from 'react';
import { Dropdown, Menu } from 'antd';
import { getAccountDetailsRoute, ROUTES } from '../shared/router/Router';
import { LiskAvatar } from '../components/lisk-avatar/LiskAvatar';
import { renderMenuItem } from '../components/dropdown-menu/HeaderDropDown';
import { getFormattedNumber } from '../utils/numbers';
import { AccountModel } from '../models/account.model';
import { useEffect, useRef } from 'react';
import { DownOutlined, LogoutOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface ContainerProps {
  account: AccountModel
}

export const AppContainerHeaderAuthenticatedAccount: React.FC<ContainerProps> = ({ account }) => {
  const menu = [
    {
      key: 'feedback',
      label: 'Give feedback',
      path: ROUTES.GAMES,
      description: 'Help us improve the ecosystem',
      icon: <InfoCircleOutlined />
    },
    {
      divide: true
    },
    {
      key: 'logout',
      label: 'Log out',
      path: ROUTES.LOGOUT,
      icon: <LogoutOutlined />
    }
  ]

  const balanceRef: any = useRef(null);

  useEffect(() => {
    const balanceNode = balanceRef.current;
    if (balanceNode && balanceNode.classList && account.balance !== "0") {
      balanceNode.classList.add('balance-updated');
      setTimeout(() => {
        balanceNode.classList.remove('balance-updated');
      }, 3000);
    }
  }, [account.balance])

  return (
    <div className="flex-c h60--fixed">
      <Link to={getAccountDetailsRoute(account.address)} ref={balanceRef} className="flex-c click p5-10 bgc-lblue br20 mr15">
        <span className="mr10 fc-blue ffm-bold ml15">{getFormattedNumber(account.balance)} ARCD</span>
      </Link>
      <Dropdown
        overlay={
          <Menu
            className="bg--dd-menu">
            {menu.map((menu_item, idx) => {
              return menu_item.divide ? <Menu.Divider className="ml5 mr5" /> : renderMenuItem(menu_item, idx, account)
            })}
          </Menu>
        }
        placement="bottomRight"
      >
        <div className="click flex-c flex-jc-c h60--fixed">
            <div className="ml15 arcado-avatar mr10">
              <LiskAvatar
                address={account.address}
                size="xs"
              />
          </div>
          <div className="fs-xxs">
            <DownOutlined />
          </div>
        </div>
      </Dropdown>
    </div>
  )
}
