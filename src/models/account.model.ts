export interface IAccount {
  address: string;
  balance: string;
  win?: number;
  loss?: number;
}

export default class AccountModel implements IAccount {
  address: string
  balance: string
  win?: number
  loss?: number

  constructor(account: IAccount) {
    if (account) {
      this.address = account.address;
      this.balance = account.balance;
      this.win = account.win;
      this.loss = account.loss;
    }
  }
}
