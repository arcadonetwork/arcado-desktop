import { Dispatch, iRootState } from '../store/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContainerHeaderAuthenticatedAccount } from './AppContainerHeaderAuthenticatedAccount';

interface ContainerProps {
}

export const AppContainerHeaderAccountSynced: React.FC<ContainerProps> = () => {

  const account = useSelector((state: iRootState) => state.session.account);
  //const isOnline = useSelector((state: iRootState) => state.network.online);
  const dispatch = useDispatch<Dispatch>();

  return (
    <div className="ml-auto flex-c">
      {/*<div className="fc-grey fs-s mr15 pr15 br-r">
        {isOnline ? "connected" : "no connection"}
      </div>*/}
      <div onClick={() => dispatch.session.addFunds(account.address)} className="click fc-blue fs-s mr25 ffm-bold">
        add funds
      </div>
      <AppContainerHeaderAuthenticatedAccount />
    </div>
  )
}

