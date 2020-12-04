import React, { useEffect, useState } from 'react';
import { AccountDetailsHeader } from './AccountDetailsHeader';
import { Loading } from '../../components/Loading';
import { RouteComponentProps } from 'react-router';
import { fetchAccountInfo } from '../../shared/api/accounts';
import { isObjectWithFields } from '../../utils/type-checking';
import { AccountDetailsNotFound } from './AccountDetailsNotFound';
import { AccountModel } from '../../typings/account';
import { Navigation } from '../../components/navigation/Navigation';
import { getAccountDetailsMenu } from './AccountDetailsMenu';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const AccountDetails: React.FC<ContainerProps> = ({ match, history }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<AccountModel>(undefined);

  const [activePageItem, setActivePageItem] = useState(undefined);
  const [menu, setMenu] = useState(undefined);

  const { address } = match.params;
  const { url } = match;

  async function getAccountDetails () {
    try {
      const accountModel = await fetchAccountInfo(address);
      setAccount(accountModel);
      const isDelegate = !!accountModel.dpos.delegate.username;
      const menu = await getAccountDetailsMenu(isDelegate);
      setMenu(menu);
      setActivePageItem(menu[0])
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
      <div className="w100 mb25">
        <Navigation
          setPage={setActivePageItem}
          page={activePageItem.page}
          url={url}
          menu={menu}
        />
      </div>
      {
        isObjectWithFields(activePageItem)
        ? <activePageItem.Component account={account} />
        : ''
      }
      {/*<AccountDetailsTransactions
        account={account}
      />*/}
    </div>
  )
}
