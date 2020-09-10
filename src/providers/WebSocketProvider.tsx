import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../store/store';
import { BlockModel } from '../models/block.model';
import { isObjectWithFields } from '../utils/type-checking';

const WebSocketProvider = createContext(null)

export { WebSocketProvider }

export default ({ children }: { children: any }) => {
  let socket;
  let ws;

  const targetNetwork = useSelector((state: iRootState) => state.network.targetNetwork);
  const dispatch = useDispatch<Dispatch>();

  console.log(targetNetwork);

  if (!isObjectWithFields(targetNetwork)){
    return <>{children}</>;
  }

  if (!socket && isObjectWithFields(targetNetwork)) {
    socket = io(targetNetwork.nodeUrl, { transports: ['websocket'] })


    socket.on('connect', () => {
      dispatch.network.setStatusUpdate({ online: true });
    });

    socket.on('disconnect', () => {
      console.log(('disconnecting'))
      dispatch.network.setStatusUpdate({ online: false });
    });

    socket.on('reconnect', () => {
      dispatch.network.setStatusUpdate({ online: true });
    });

    socket.on('blocks/change', (block: BlockModel) => {
      dispatch.network.newBlockCreated({ block });
    });

    ws = {
      socket: socket
    }
  }

  return (
    <WebSocketProvider.Provider value={ws}>
      {children}
    </WebSocketProvider.Provider>
  )
}
