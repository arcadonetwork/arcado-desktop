import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

import { Provider } from 'react-redux';

import { store, history } from './store/store';

import { AppContainer } from './containers/AppContainer';
import AppRoutes from './shared/router/Router';
import WebSocketProvider from './shared/providers/WebSocketProvider';
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
