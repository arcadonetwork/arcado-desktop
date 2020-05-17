import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { session } from './session';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export interface RootModel {
  session: typeof session
}

const models: RootModel = {
  session
}

export const store = (initialState = {}) => {
  const reducers = {
    router: connectRouter(history)
  };
  const middlewares = [routerMiddleware(history)];

  return init({
    models,
    redux: {
      initialState,
      reducers,
      middlewares
    }
  });
};


export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
