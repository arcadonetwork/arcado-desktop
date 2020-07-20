import React, { createContext } from 'react'
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import BlockModel from '../../models/block.model';
import { Dispatch } from '../../store/store';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }: { children: any }) => {
  let socket;
  let ws;

  const dispatch = useDispatch<Dispatch>();

  if (!socket) {
    socket = io.connect(`${WS_BASE}`, {
      path: 'rpc',
      transports: ['websocket']
    })
    socket = io.connect(`${WS_BASE}`)

    socket.on('connect', () => {
      dispatch.network.setStatusUpdate({ online: true });
    });

    socket.on('disconnect', () => {
      dispatch.network.setStatusUpdate({ online: false });
    });

    socket.on('reconnect', () => {
      dispatch.network.setStatusUpdate({ online: false });
    });

    socket.on('blocks/change', (block: BlockModel) => {
      console.log('new block')
      dispatch.blocks.newBlockCreated(block);
    });

    ws = {
      socket: socket
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}
