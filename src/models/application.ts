import { Dispatch } from '../store';

export type ApplicationState = {
  user: User
}

export interface User {

}

export const application = {
  state: {
    user: {
    }
  },
  reducers: {
    setUserState (state: ApplicationState, user: User) {
      state.user = user
    },
  },
  effects: (dispatch: Dispatch) => ({
    async setUser (user: User) {
      //dispatch.application.setUserState(user)
    },
  }),
};
