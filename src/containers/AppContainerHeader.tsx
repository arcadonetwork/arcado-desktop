import * as React from 'react';

import { AppContainerHeaderAccountSynced } from './AppContainerHeaderAccountSynced'
import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo'
import { ROUTES } from '../utils/router/Router';
import { useSelector } from 'react-redux';
import { iRootState } from '../store/store';
import { AppContainerHeaderAccountLoading } from './AppContainerHeaderAccountLoading';

interface ContainerProps {
}

export const AppContainerHeader: React.FC<ContainerProps> = () => {

  const isOnline = useSelector((state: iRootState) => state.network.online);
  const isLoading = useSelector((state: iRootState) => state.accounts.isValidAndLoading);
  const isValidAndSynced = useSelector((state: iRootState) => state.accounts.isValidAndSynced);

  return (
    <div className="w100 bgc-xxl-grey br-b h70--fixed">
      <div className="w90 h100 m-auto flex-c">
        <Link to={ROUTES.HOME} className="">
          <div className=" w75--fixed" >
            <Logo />
          </div>
        </Link>
        <div className="ml25 pl25 br-l">
          {
            isOnline
              ? (
                <div className="flex-c">
                  <div className="circle square-10 bgc-green" />
                  <div className="ml5">connected with <span className="ffm-bold fc-black">mainnet</span></div>
                </div>
              )
              : (
                <div className="flex-c">
                  <div className="circle square-10 bgc-red" />
                  <div className="ml5">disconnected</div>
                </div>
              )
          }
        </div>
        {
          isLoading
          ? <AppContainerHeaderAccountLoading />
            : isValidAndSynced
              ? <AppContainerHeaderAccountSynced />
              : <></>
        }
      </div>
    </div>
  )
}
