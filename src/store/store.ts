import { init, RematchDispatch, RematchRootState,  } from '@rematch/core';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { account } from './models/account';
import { network } from './models/network';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export interface RootModel {
  account: typeof account,
  network: typeof network
}

const models: RootModel = {
  account,
  network
}

export const store = init({
  models,
  redux: {
    reducers: {
      router: connectRouter(history)
    },
    middlewares:[routerMiddleware(history)],
  },
});

export const getState = store.getState;

export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
