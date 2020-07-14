import * as React from 'react';

import { AppContainerHeaderUser } from './AppContainerHeaderUser'
import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo'
import { ROUTES } from '../utils/router/Router';

interface ContainerProps {
}

export const AppContainerHeader: React.FC<ContainerProps> = () => {
  return (
    <div className="app-header w100 bgc-xxl-grey h60--fixed flex-c">
      <Link to={ROUTES.HOME} className="ml50">
        <div className=" w75--fixed" >
          <Logo />
        </div>
      </Link>
      <AppContainerHeaderUser />
    </div>
  )
}
