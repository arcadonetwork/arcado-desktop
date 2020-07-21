import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

import { Provider } from 'react-redux';

import { store } from './store/store';

import { AppContainer } from './containers/AppContainer';
import AppRoutes from './utils/router/Router';
import WebSocketProvider from './utils/websocket-context/WebSocketContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <WebSocketProvider>
      <BrowserRouter>
        <AppContainer>
          <AppRoutes />
        </AppContainer>
      </BrowserRouter>
    </WebSocketProvider>
  </Provider>,
  document.getElementById('root')
)
