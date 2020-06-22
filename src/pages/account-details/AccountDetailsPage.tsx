import React, { useEffect, useState } from 'react';
import { AccountDetailsPageHeader } from './AccountDetailsPageHeader';
import { Dispatch, iRootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';

interface ContainerProps {
}

export const AccountDetailsPage: React.FC<ContainerProps> = () => {
  const dispatch = useDispatch<Dispatch>();
  const account = useSelector((state: iRootState) => state.session.account);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getAccount () {
      await dispatch.session.getAccount(account.email);
      setIsLoading(false);
    }
    if (isLoading) {
      getAccount();
    }
    return () => '';
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <AccountDetailsPageHeader
        account={account}
      />
    </div>
  )
}
