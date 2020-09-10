import * as React from 'react';

import { useSelector } from 'react-redux';
import { iRootState } from '../store/store';
import { isObjectWithFields } from '../utils/type-checking';

interface ContainerProps {
}

export const AppContainerSecondary: React.FC<ContainerProps> = () => {

  const isOnline = useSelector((state: iRootState) => state.network.online);
  const blockHeight = useSelector((state: iRootState) => state.network.blockHeight);
  const targetNetwork = useSelector((state: iRootState) => state.network.targetNetwork);

  if (!isObjectWithFields(targetNetwork)) return <></>

  return (
    <div className="w100 bgc-xxl-grey br-b">
      <div className="grid-xl h100 m-auto flex-c pt10 pb10">
        <div className="flex-c ">
          <span className="fs-s mr5 ffm-bold fc-black p0 m0">Height:</span>
          <span className="fs-s  p0 m0">{blockHeight}</span>
        </div>
        <div className="ml25 pl25 br-l">
          {
            isOnline
              ? (
                <div className="flex-c">
                  <div className="circle square-10 bgc-green" />
                  <div className="ml5">connected with <span className="ffm-bold fc-black">mainnet</span></div>
                </div>
              )
              : (
                <div className="flex-c">
                  <div className="circle square-10 bgc-red" />
                  <div className="ml5">disconnected</div>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}
