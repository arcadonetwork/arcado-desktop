import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { session } from './models/session';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export interface RootModel {
  session: typeof session
}

const models: RootModel = {
  session
}

export const store = init({
  models
});


export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
