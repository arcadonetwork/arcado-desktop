import * as React from 'react';
import { AppContainerHeader } from './AppContainerHeader';

interface ContainerProps {
  children: any
}

export const AppContainer: React.FC<ContainerProps> = ({ children }) => (
  <>
    <AppContainerHeader />
    <div>
      {children}
    </div>
  </>
)
