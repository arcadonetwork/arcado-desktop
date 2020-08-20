import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';
import BlockModel from '../../models/block.model';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }: { children: any }) => {
  let socket;
  let ws;

  const dispatch = useDispatch<Dispatch>();
  const account = useSelector((state: iRootState) => state.accounts.account);

  if (!socket) {
    socket = io(`http://localhost:4000`, { transports: ['websocket'] })

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
      dispatch.blocks.newBlockCreated({ block, account });
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
