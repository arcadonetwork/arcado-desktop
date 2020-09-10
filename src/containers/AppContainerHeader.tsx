import * as React from 'react';

import { AppContainerHeaderAuthenticated } from './AppContainerHeaderAuthenticated'
import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo'
import { ROUTES } from '../shared/router/Router';
import { useSelector } from 'react-redux';
import { iRootState } from '../store/store';
import { AppContainerHeaderNetworkSetup } from './AppContainerHeaderNetworkSetup';

interface ContainerProps {
}

export const AppContainerHeader: React.FC<ContainerProps> = () => {

  const isValidAndSynced = useSelector((state: iRootState) => state.account.isValidAndSynced);

  return (
    <div className="w100 bgc-xxl-grey br-b h60--fixed">
      <div className="grid-xl h60--fixed m-auto flex-c">
        <Link to={ROUTES.HOME} className="p0 m0">
          <div className="p0 m0 h100 w75--fixed" >
            <Logo />
          </div>
        </Link>
        {
           isValidAndSynced
              ? <AppContainerHeaderAuthenticated />
              : <AppContainerHeaderNetworkSetup  />
        }
      </div>
    </div>
  )
}
