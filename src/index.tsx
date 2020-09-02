import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

import { Provider } from 'react-redux';

import { store, history } from './store/store';

import { AppContainer } from './containers/AppContainer';
import AppRoutes from './utils/router/Router';
import WebSocketProvider from './utils/websocket-context/WebSocketContext';
import { ConnectedRouter } from 'connected-react-router';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <WebSocketProvider>
          <AppContainer>
            <AppRoutes />
          </AppContainer>
      </WebSocketProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
