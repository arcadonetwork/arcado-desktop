import React, { createContext } from 'react'

import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { isObjectWithFields } from '../../utils/type-checking';
//const { createWSClient } = require('@liskhq/lisk-api-client/dist-browser');


const WebSocketProvider = createContext(null)

export { WebSocketProvider }

export default ({ children }: { children: any }) => {
  let socket;
  let ws;

  const targetNetwork = useSelector((state: iRootState) => state.network.targetNetwork);
  //const dispatch = useDispatch<Dispatch>();

  if (isObjectWithFields(targetNetwork)){
    return <>{children}</>;
  }
/*
  async function startWs () {
    const client = await createWSClient(targetNetwork.wsUrl)

    client.subscribe('app:network:ready', () => {
      dispatch.network.setStatusUpdate({ online: true });
    });

    client.subscribe('app:shutdown', () => {
      dispatch.network.setStatusUpdate({ online: false });
    });

    client.subscribe('app:block:new', (block: any) => {
      console.log('new block', block)
      dispatch.network.newBlockCreated({ block });
    });

  }*/

  if (!socket && isObjectWithFields(targetNetwork)) {
    //startWs();
    ws = {
      socket
    }
  }

  return (
    <WebSocketProvider.Provider value={ws}>
      {children}
    </WebSocketProvider.Provider>
  )
}
