import React from 'react';
import { AccountDetailsPageHeader } from './AccountDetailsPageHeader';
import { AccountDetailsPageMenu } from './AccountDetailsPageMenu';
import { iRootState } from '../../store/store';
import { connect } from 'react-redux';
import { IAccount } from '../../models/account.model';

interface ContainerProps {
  account: IAccount
}

const mapStateToProps = (state: iRootState) => {
  return {
    account: state.session.account,
    isAuthenticated: state.session.isAuthenticated
  }
}

const mapDispatch = () => ({})

const AccountDetailsPageComponent: React.FC<ContainerProps> = ({ account }) => {

  return (
    <div>
      <AccountDetailsPageHeader account={account} />
      <AccountDetailsPageMenu />
    </div>
  )
}

export const AccountDetailsPage = connect(
  mapStateToProps,
  mapDispatch
)(AccountDetailsPageComponent)
