import UserModel from '../models/user.model';
import { iRootState } from '../store/store';
import * as React from 'react';
import { connect } from 'react-redux';

interface ContainerProps {
  user: UserModel,
  isAuthenticated: boolean
}

const mapStateToProps = (state: iRootState) => {
  return {
    user: state.user,
    isAuthenticated: state.authentication
  }
}

const AppContainerHeaderUserComponent: React.FC<ContainerProps> = ({ isAuthenticated, user }) => {
  if (!isAuthenticated) {
    return <></>
  }
  return (
    <div className="ml-auto mr50">
      <span className="fc-white">{user.userId}</span>
    </div>
  )
}

export const AppContainerHeaderUser = connect(
  mapStateToProps,
  null
)(AppContainerHeaderUserComponent)
