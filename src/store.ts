import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { createBrowserHistory } from 'history';
import { RootModel, models } from './models';

export const history = createBrowserHistory();

export const store = init({
  models
});


export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
