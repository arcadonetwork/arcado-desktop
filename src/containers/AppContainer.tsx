import * as React from 'react';
import { AppContainerHeader } from './AppContainerHeader';
import { AppContainerSecondary } from './AppContainerHeaderSecondary';

interface ContainerProps {
  children: any
}

export const AppContainer: React.FC<ContainerProps> = ({ children }) => (
  <>
    <AppContainerHeader />
    <AppContainerSecondary />
    <div className="w100 vh100minus60">
      {children}
    </div>
  </>
)
