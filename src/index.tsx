import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

import { Provider } from 'react-redux';

import { store } from './store/store';

import { AppContainer } from './containers/AppContainer';
import AppRoutes from './shared/router/Router';
import { BrowserRouter } from 'react-router-dom';

const _store = store();

ReactDOM.render(
  <Provider store={_store}>
    <BrowserRouter>
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
