import UserModel from '../models/user.model';

const initialState = {
  user: new UserModel()
}

export type Session = {
  user: UserModel
}

export const session = {
  state: initialState,
  reducers: {
    setUserState: (user: UserModel) => {
      return {
        ...user
      }
    },
  },
  effects: () => ({
    setUser (user: UserModel) {
      this.setUserState(user)
    },
  }),
};
