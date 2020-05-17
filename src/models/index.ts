import { application } from './application';

export interface RootModel {
  application: typeof application
}

export const models: RootModel = {
  application
}
