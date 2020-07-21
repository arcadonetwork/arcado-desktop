import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { session } from './models/session';
import { network } from './models/network';
import { blocks } from './models/blocks';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export interface RootModel {
  session: typeof session,
  network: typeof network,
  blocks: typeof blocks
}

const models: RootModel = {
  session,
  network,
  blocks
}

export const store = init({
  models,
});

export type Dispatch = RematchDispatch<RootModel>
export type iRootState = RematchRootState<RootModel>
