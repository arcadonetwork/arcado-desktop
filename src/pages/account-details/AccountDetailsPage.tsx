import React, { useState } from 'react';
import { AccountDetailsPageHeader } from './AccountDetailsPageHeader';
import { iRootState } from '../../store/store';
import { connect } from 'react-redux';
import { IAccount } from '../../models/account.model';
import { PageNavigation } from 'src/components/PageNavigation';
import { AccountDetailsPageTransactions } from './AccountDetailsPageTransactions';

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

const menu = ['Transactions']

const AccountDetailsPageComponent: React.FC<ContainerProps> = ({ account }) => {
  const [page, setPage] = useState(menu[0]);
  return (
    <div>
      <AccountDetailsPageHeader account={account} />
      <PageNavigation
        menu={menu}
        activePage={page}
        setPage={(page) => setPage(page)}
      />
      <AccountDetailsPageTransactions
        account={account}
      />
    </div>
  )
}

export const AccountDetailsPage = connect(
  mapStateToProps,
  mapDispatch
)(AccountDetailsPageComponent)
