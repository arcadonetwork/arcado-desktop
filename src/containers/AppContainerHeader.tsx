import * as React from 'react';

import logo from '../assets/logo.svg'

interface ContainerProps {

}

export const AppContainerHeader: React.FC<ContainerProps> = () => {
  return (
    <div className="app-header w100 bgc-black h60--fixed flex-c">
      <div className="ml50 w250--fixed">
        <img src={logo} className="logo" />
      </div>
    </div>
  )
}
