import * as React from 'react';

import { AppContainerHeaderAuthenticated } from './AppContainerHeaderAuthenticated'
import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo'
import { ROUTES } from '../shared/router/Router';
import { useSelector } from 'react-redux';
import { iRootState } from '../store/store';
import { AppContainerHeaderNetworkSetup } from './AppContainerHeaderNetworkSetup';
import { AppContainerHeaderSearchBar } from './AppContainerHeaderSearchBar';

interface ContainerProps {
}

export const AppContainerHeader: React.FC<ContainerProps> = () => {

  const isValidAndSynced = useSelector((state: iRootState) => state.account.isValidAndSynced);

  return (
    <div className="w100 bgc-xxl-grey br-b h60--fixed">
      <div className="w100 pr15 pl15 h60--fixed m-auto flex-c">
        <div className="h100 flex-c">
          <Link to={ROUTES.HOME} className="ml25 flex-c h100 w85--fixed">
            <Logo className="w85--fixed" />
          </Link>
        </div>
        {
          isValidAndSynced
          ? <AppContainerHeaderSearchBar />
          : ''
        }
        {
          isValidAndSynced
            ? <AppContainerHeaderAuthenticated />
            : <AppContainerHeaderNetworkSetup  />
        }
      </div>
    </div>
  )
}
