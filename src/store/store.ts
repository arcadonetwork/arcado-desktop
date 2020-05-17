import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { user } from './models/user';
import { authentication } from './models/authentication';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export interface RootModel {
  user: typeof user,
  authentication: typeof authentication,
}

const models: RootModel = {
  user,
  authentication
}

export const store = init({
  models
});


export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
