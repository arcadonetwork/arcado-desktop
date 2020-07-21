import React, { createContext } from 'react'
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store/store';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }: { children: any }) => {
  let socket;
  let ws;

  const dispatch = useDispatch<Dispatch>();

  if (!socket) {
    /*socket = io(`http://127.0.0.1:5000`, { transports: ['websocket'], reconnection: true,
      reconnectionDelay: 500,
      jsonp: false, })*/
    socket = {
      on: (value: string, fn: any) => ''
    }

    socket.on('connect', () => {
      dispatch.network.setStatusUpdate({ online: true });
    });

    socket.on('disconnect', () => {
      dispatch.network.setStatusUpdate({ online: false });
    });

    socket.on('reconnect', () => {
      dispatch.network.setStatusUpdate({ online: false });
    });

    socket.on('blocks/change', (block: any) => {
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
