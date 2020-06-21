export interface IAccount {
  address: string;
  passphrase: string;
  publicKey: string;
  balance?: string;
  win?: number;
  loss?: number;
}

export default class AccountModel implements IAccount {
  address: string
  publicKey: string;
  win?: number
  balance?: string;
  passphrase: string
  loss?: number

  constructor(account: IAccount) {
    if (account) {
      this.address = account.address;
      this.publicKey = account.publicKey;
      this.balance = account.balance;
      this.win = account.win;
      this.loss = account.loss;
      this.passphrase = account.passphrase;
    }
  }
}
