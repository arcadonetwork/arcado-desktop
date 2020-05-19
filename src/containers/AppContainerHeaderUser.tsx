import AccountModel from '../models/account.model';
import { Dispatch, iRootState } from '../store/store';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { History } from 'history';
import { Icon, Dropdown, Menu } from 'antd';
import { ROUTES } from '../shared/router/Router';
import { RouteComponentProps, withRouter } from 'react-router';

interface ContainerProps extends RouteComponentProps {
  account?: AccountModel,
  isAuthenticated?: boolean,
  history: History
}

const mapState = (state: iRootState) => {
  return {
    account: state.session.account,
    isAuthenticated: state.session.isAuthenticated
  }
}

const AppContainerHeaderUserComponent: React.FC<ContainerProps> = ({ isAuthenticated, account, history }) => {
  const dispatch = useDispatch<Dispatch>();
  if (!isAuthenticated) {
    return <></>
  }
  function handleMenuClick (key: string) {
    if (key === 'logout') {
      dispatch.session.logout();
    } else if (key === 'profile') {
      history.push(ROUTES.ACCOUNT_DETAILS);
    }
  }

  return (
    <Dropdown
      overlay={
        <Menu onClick={(({ key }) =>  handleMenuClick(key))}>
          <Menu.Item key="profile">
            <span>My Account</span>
          </Menu.Item>
          <Menu.Item key="logout">
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
    >
      <div className="ml-auto h100 click flex-c mr50">
        <span className="fc-white fs-s">{account.address}</span>
        <div className="ml15 arcado-avatar" />
        <div className="ml15 fc-white fs-xs">
          <Icon type="down" />
        </div>
      </div>
    </Dropdown>
  )
}

export const AppContainerHeaderUser = withRouter(connect(mapState, null)(AppContainerHeaderUserComponent))
