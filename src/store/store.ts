import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { account } from './models/account';
import { network } from './models/network';
import { blocks } from './models/blocks';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export interface RootModel {
  accounts: typeof account,
  network: typeof network,
  blocks: typeof blocks
}

const models: RootModel = {
  accounts: account,
  network,
  blocks
}

export const store = init({
  models,
});

export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
