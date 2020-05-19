export interface ITransaction {
  address: string;
  balance: string;
}

export default class TransactionModel implements ITransaction {
  address: string
  balance: string

  constructor(transaction: ITransaction) {
    if (transaction) {
      this.address = transaction.address;
      this.balance = transaction.balance;
    }
  }
}
