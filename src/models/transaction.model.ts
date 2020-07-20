export interface ITransaction {
  id: string;
  height: number;
  blockId: string;
  type: number;
  timestamp: string;
  senderPublicKey: string;
  recipientPublicKey: string;
  senderId: string;
  recipientId: string;
  signature: string;
}

export default class TransactionModel implements ITransaction {
  id: string;
  height: number;
  blockId: string;
  type: number;
  timestamp: string;
  senderPublicKey: string;
  recipientPublicKey: string;
  senderId: string;
  recipientId: string;
  signature: string;

  constructor(transaction: ITransaction) {
    if (transaction) {
      this.id = transaction.id;
      this.height = transaction.height;
      this.blockId = transaction.blockId;
      this.type = transaction.type;
      this.timestamp = transaction.timestamp;
      this.senderPublicKey = transaction.senderPublicKey;
      this.recipientPublicKey = transaction.recipientPublicKey;
      this.senderId = transaction.senderId;
      this.recipientId = transaction.recipientId;
      this.signature = transaction.signature;
    }
  }
}
