import * as React from 'react';
import { Loading } from '../components/Loading';

interface ContainerProps {
}

export const AppContainerHeaderAccountLoading: React.FC<ContainerProps> = () => {
  return (
    <div className="ml-auto h100 w250--fixed br-l br-r bgc-xxl-grey flex-c flex-jc-c">
      <Loading />
      <span className="ml15 fs-s fc-lb">Syncing account</span>
    </div>
  )
}

