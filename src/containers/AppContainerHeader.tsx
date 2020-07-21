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

  const isLoading = useSelector((state: iRootState) => state.session.isValidAndLoading);
  const isValidAndSynced = useSelector((state: iRootState) => state.session.isValidAndSynced);

  return (
    <div className="w100 bgc-white br-b h70--fixed">
      <div className="w90 h100 m-auto flex-c">
        <Link to={ROUTES.HOME} className="">
          <div className=" w75--fixed" >
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
