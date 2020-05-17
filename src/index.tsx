import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

import { Provider } from 'react-redux';

import { store } from './store';

import { AppContainer } from './containers/AppContainer';
import { AppRoutes } from './shared/router';
import { BrowserRouter } from 'react-router-dom';

const target = document.querySelector('#root');


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer>
          <AppRoutes />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    target
  );
}

render();
