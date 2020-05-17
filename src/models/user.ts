export type User = {
  userId: string
}

export const user = {
  state: {
  },
  reducers: {
    setUserState: (user: User) => {
      return {
        ...user
      }
    },
  },
  effects: () => ({
    setUser (user: User) {
      this.setUserState(user)
    },
  }),
};
