import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store/store';
import BlockModel from '../../models/block.model';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }: { children: any }) => {
  let socket;
  let ws;

  const dispatch = useDispatch<Dispatch>();

  if (!socket) {
    socket = io(`http://localhost:4000`, { transports: ['websocket'] })

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
