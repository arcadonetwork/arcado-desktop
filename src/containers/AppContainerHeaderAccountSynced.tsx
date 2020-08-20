import { Dispatch, iRootState } from '../store/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContainerHeaderAuthenticatedAccount } from './AppContainerHeaderAuthenticatedAccount';
import { Loading } from '../components/Loading';

interface ContainerProps {
}

export const AppContainerHeaderAccountSynced: React.FC<ContainerProps> = () => {

  const account = useSelector((state: iRootState) => state.accounts.account);
  const isFundingAccount = useSelector((state: iRootState) => state.accounts.isFundingAccount);
  const dispatch = useDispatch<Dispatch>();

  return (
    <div className="ml-auto flex-c">
      {
        isFundingAccount
        ? (
            <div className="flex-c">
              <Loading />
              <span className="ml15">sending fund transaction</span>
            </div>
          )
        : <div onClick={() => dispatch.accounts.addFunds(account.address)} className="click fc-blue fs-s mr25 ffm-bold">
            add funds
          </div>
      }
      <AppContainerHeaderAuthenticatedAccount />
    </div>
  )
}

