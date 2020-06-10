import * as React from 'react';

import logo from '../assets/logo.svg'
import { AppContainerHeaderUser } from './AppContainerHeaderUser'
import { ROUTES } from '../shared/router/Router';
import { Link } from 'react-router-dom';

interface ContainerProps {
}

export const AppContainerHeader: React.FC<ContainerProps> = () => {
  return (
    <div className="app-header w100 bgc-black h60--fixed flex-c">
      <Link to={ROUTES.HOME} className="ml50 w250--fixed">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <AppContainerHeaderUser />
    </div>
  )
}
