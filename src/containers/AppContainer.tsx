import * as React from 'react';
import { AppContainerHeader } from './AppContainerHeader';

interface ContainerProps {
  children: any
}

export const AppContainer: React.FC<ContainerProps> = ({ children }) => (
  <>
    <AppContainerHeader />
    <div className="w100 vh100minus60">
      {children}
    </div>
  </>
)
