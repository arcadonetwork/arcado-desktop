export interface IAccount {
  address: string;
  balance: string;
}

export default class AccountModel implements IAccount {
  address: string
  balance: string

  constructor(account: IAccount) {
    if (account) {
      this.address = account.address;
      this.balance = account.balance;
    }
  }
}
