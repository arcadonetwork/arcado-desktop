import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { AccountModel } from '../../typings/account';
import { AccountDetailsHallarCalendar } from './AccountDetailsHallarCalendar';


interface ContainerProps {
  account: AccountModel
}

const AccountDetailsHallar: React.FC<ContainerProps> = ({ account }) => {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    async function fetchData() {
      try {

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
    return () => ''
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div className="w100 mb200">
      <AccountDetailsHallarCalendar account={account} />
    </div>
  )
}

export default AccountDetailsHallar;
