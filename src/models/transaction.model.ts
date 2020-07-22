import AssetModel from './asset.model';

export interface ITransaction {
  id: string;
  height: number;
  blockId: string;
  type: number;
  timestamp: number;
  senderPublicKey: string;
  senderId: string;
  signature: string;
  asset: AssetModel;
}

export default class TransactionModel implements ITransaction {
  id: string;
  height: number;
  blockId: string;
  type: number;
  timestamp: number;
  senderPublicKey: string;
  senderId: string;
  signature: string;
  asset: AssetModel;

  constructor(transaction: ITransaction) {
    if (transaction) {
      this.id = transaction.id;
      this.height = transaction.height;
      this.blockId = transaction.blockId;
      this.type = transaction.type;
      this.timestamp = transaction.timestamp;
      this.senderPublicKey = transaction.senderPublicKey;
      this.senderId = transaction.senderId;
      this.signature = transaction.signature;
      this.asset = transaction.asset;
    }
  }
}
