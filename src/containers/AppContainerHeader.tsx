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

  const isLoading = useSelector((state: iRootState) => state.account.isValidAndLoading);
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
