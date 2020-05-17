export interface IUser {
  userId: string;
}

export default class UserModel implements IUser {
  userId: string;

  constructor(user: IUser) {
    if (user) {
      this.userId = user.userId;
    }
  }
}
