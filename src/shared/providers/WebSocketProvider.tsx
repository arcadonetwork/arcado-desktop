import React, { createContext } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';
import { isObjectWithFields } from '../../utils/type-checking';
//const { createWSClient } = require('@liskhq/lisk-api-client/dist-browser');

import WebSocket from 'isomorphic-ws';


const WebSocketProvider = createContext(null)

export { WebSocketProvider }

export default ({ children }: { children: any }) => {
  let socket;
  let ws: any;

  const targetNetwork = useSelector((state: iRootState) => state.network.targetNetwork);
  const dispatch = useDispatch<Dispatch>();

  if (!isObjectWithFields(targetNetwork)){
    return <>{children}</>;
  }

  ws = new WebSocket(targetNetwork.wsUrl);
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

  async function startWs () {
    ws.onopen = () => {
      dispatch.network.setStatusUpdate({ online: true });
    }

    ws.onclose = () => {
      dispatch.network.setStatusUpdate({ online: false });
    }

    ws.onmessage = ({ data } : { data: any }) => {
      const message = JSON.parse(data);
      console.log(message);
      if (message.method === 'app:transaction:new') {
        console.log(message.params)
        dispatch.network.newTransactionFound(message.params.transaction);
      }
    }
  }

  if (!socket && isObjectWithFields(targetNetwork)) {
    startWs();
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
