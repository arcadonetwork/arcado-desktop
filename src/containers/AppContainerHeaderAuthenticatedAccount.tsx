import { iRootState } from '../store/store';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import { ROUTES } from '../utils/router/Router';
import { LiskAvatar } from '../components/lisk-avatar/LiskAvatar';
import { renderMenuItem } from '../components/dropdown-menu/HeaderDropDown';
import { getFormattedNumber } from '../utils/numbers';

interface ContainerProps {
}

export const AppContainerHeaderAuthenticatedAccount: React.FC<ContainerProps> = () => {
  const account = useSelector((state: iRootState) => state.accounts.account);
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
        <div className="br flex-c p5 br20">
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
