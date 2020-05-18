export interface IAccount {
  address: string;
}

export default class AccountModel implements IAccount {
  address: string

  constructor(account: IAccount) {
    if (account) {
      this.address = account.address;
    }
  }
}
