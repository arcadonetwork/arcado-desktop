import React, { useEffect, useState } from 'react';
import { AccountDetailsHeader } from './AccountDetailsHeader';
import { Loading } from '../../components/Loading';
import { RouteComponentProps } from 'react-router';
import { fetchAccountInfo } from '../../shared/api/accounts';
import { isObjectWithFields } from '../../utils/type-checking';
import { AccountDetailsNotFound } from './AccountDetailsNotFound';
import { AccountModel } from '../../typings/account';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const AccountDetails: React.FC<ContainerProps> = ({ match }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<AccountModel>(undefined);
  const { address } = match.params;

  async function getAccountDetails () {
    try {
      const accountModel = await fetchAccountInfo(address);
      setAccount(accountModel);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setAccount(undefined);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ''
  }, [])

  useEffect(() => {
    getAccountDetails();
    return () => setIsLoading(true);
  }, [address])

  if (isLoading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    )
  }

  if (!isObjectWithFields(account)) {
    return <AccountDetailsNotFound address={address} />
  }

  return (
    <div className="grid mt50">
      <AccountDetailsHeader
        account={account}
      />
      {/*<AccountDetailsTransactions
        account={account}
      />*/}
    </div>
  )
}
