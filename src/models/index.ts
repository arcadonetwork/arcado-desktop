import { user } from './user';

export interface RootModel {
  user: typeof user
}

export const models: RootModel = {
  user: user
}
