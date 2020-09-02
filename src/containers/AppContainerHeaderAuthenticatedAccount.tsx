import * as React from 'react';
import { Dropdown, Menu } from 'antd';
import { ROUTES } from '../utils/router/Router';
import { LiskAvatar } from '../components/lisk-avatar/LiskAvatar';
import { renderMenuItem } from '../components/dropdown-menu/HeaderDropDown';
import { getFormattedNumber } from '../utils/numbers';
import { AccountModel } from '../models/account.model';
import { useEffect, useRef } from 'react';

interface ContainerProps {
  account: AccountModel
}

export const AppContainerHeaderAuthenticatedAccount: React.FC<ContainerProps> = ({ account }) => {
  const menu = [
    {
      key: 'account',
      label: 'My account',
      path: ROUTES.ACCOUNT_DETAILS
    },
    {
      key: 'logout',
      label: 'Logout',
      path: ROUTES.LOGOUT
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
    <Dropdown
      overlay={
        <Menu
          className="bg--dd-menu">
          {menu.map((menu_item, idx) => renderMenuItem(menu_item, idx, account))}
        </Menu>
      }
      placement="bottomRight"
    >
      <div className="click flex-c flex-jc-c">
        <div ref={balanceRef} className="br flex-c p5 bgc-white br20">
          <span className="mr10 fs-s fc-black ffm-bold ml15">{getFormattedNumber(account.balance)} LSK</span>
          <div className="ml15 arcado-avatar">
            <LiskAvatar
              address={account.address}
              size="xs"
            />
          </div>
        </div>
      </div>
    </Dropdown>
  )
}
