import * as React from 'react';
import { AppContainerHeader } from './AppContainerHeader';
import { AppContainerSecondary } from './AppContainerHeaderNetwork';

interface ContainerProps {
  children: any
}

export const AppContainer: React.FC<ContainerProps> = ({ children }) => (
  <>
    <AppContainerHeader />
    <AppContainerSecondary />
    <div className="w100">
      {children}
    </div>
  </>
)
