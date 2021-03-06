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
    <div style={{ top: '0px', zIndex: 9999999 }} className="w100 bgc-white h70--fixed br-b pos-fixed overflow-hidden">
      <div className="w100 pr15 pl15 h70--fixed m-auto flex-c">
        <div className="h100 flex-c mr50">
          <Link to={ROUTES.HOME} className="ml25 flex-c h100 w85--fixed">
            <Logo className="w85--fixed" />
          </Link>
        </div>
        {
          isValidAndSynced
            ? <>
              <AppContainerHeaderSearchBar />
              <AppContainerHeaderAuthenticated />
            </>
            : <AppContainerHeaderNetworkSetup  />
        }
      </div>
    </div>
  )
}
