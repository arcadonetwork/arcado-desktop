import UserModel from '../models/user.model';
import { Dispatch, iRootState } from '../store/store';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Icon, Dropdown, Menu } from 'antd';

interface ContainerProps {
  user?: UserModel,
  isAuthenticated?: boolean
}

const mapState = (state: iRootState) => {
  return {
    user: state.user,
    isAuthenticated: state.authentication
  }
}

const AppContainerHeaderUserComponent: React.FC<ContainerProps> = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch<Dispatch>();
  if (!isAuthenticated) {
    return <></>
  }
  function handleMenuClick (key: string) {
    if (key === 'logout') {
      dispatch({ type: 'authentication/logout' })
    }
  }

  return (
    <Dropdown
      overlay={
        <Menu onClick={(({ key }) =>  handleMenuClick(key))}>
          <Menu.Item key="logout">
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
    >
      <div className="ml-auto h100 click flex-c mr50">
        <span className="fc-white fs-s">{user.userId}</span>
        <div className="ml15 arcado-avatar" />
        <div className="ml15 fc-white fs-xs">
          <Icon type="down" />
        </div>
      </div>
    </Dropdown>
  )
}

export const AppContainerHeaderUser = connect(mapState, null)(AppContainerHeaderUserComponent)
