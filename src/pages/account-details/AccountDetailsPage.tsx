import React, { useEffect, useState } from 'react';
import { AccountDetailsPageHeader } from './AccountDetailsPageHeader';
import { Loading } from '../../components/Loading';
import { RouteComponentProps } from 'react-router';
import { getAccount } from '../../utils/api/accounts';
import { AccountDetailsPageTransactions } from './AccountDetailsPageTransactions';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const AccountDetailsPage: React.FC<ContainerProps> = ({ match }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState(undefined);
  const { address } = match.params;

  useEffect(() => {
    async function initialiseAccount () {
      const accountModel = await getAccount(address);
      setAccount(accountModel);
      setIsLoading(false);
    }
    initialiseAccount();
    return () => setIsLoading(true);
  }, [address])

  if (isLoading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    )
  }

  return (
    <div className="grid mt50">
      <AccountDetailsPageHeader
        account={account}
      />
      <AccountDetailsPageTransactions
        account={account}
      />
    </div>
  )
}
