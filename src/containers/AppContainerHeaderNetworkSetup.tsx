import { Dispatch, iRootState } from '../store/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { availableNetworks } from '../utils/networks'
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { NetworkModel } from '../models/network.model';
import { isObjectWithFields } from '../utils/type-checking';

const Option = Select.Option;

interface ContainerProps {
}

export const AppContainerHeaderNetworkSetup: React.FC<ContainerProps> = () => {

  const [selectedNetwork, selectNetwork] = useState<NetworkModel>(undefined);
  const dispatch = useDispatch<Dispatch>();
  const hasAuthenticated = useSelector((state: iRootState) => state.account.hasAuthenticated);

  function setNetwork (identifier: string) {
    const network = availableNetworks.find(item => item.identifier === identifier);
    selectNetwork(network);
  }

  useEffect(() => {
    if (!hasAuthenticated) return;
    if (isObjectWithFields(selectedNetwork)){
      dispatch.network.setTargetNetwork(selectedNetwork);
    } else {
      dispatch.network.setTargetNetwork(availableNetworks[0]);
    }
  }, [hasAuthenticated])


  return (
    <div className="ml-auto flex-c">
      <span className="mr10">Target network:</span>
      <Select
        className="w175--fixed"
        defaultValue={availableNetworks[0].identifier}
        onChange={(identifier: string) => setNetwork(identifier)}
        placeholder=""
      >
        {
          availableNetworks.map((item) => <Option value={item.identifier}>{item.name}</Option>)
        }
      </Select>
    </div>
  )
}

