import { TransactionModel } from './transaction.model';

export type BlockModel = {
  height: number;
  version: number;
  totalAmount: string;
  totalFee: string;
  reward: string;
  payloadHash: string;
  timestamp: number;
  numberOfTransactions: number;
  payloadLength: number;
  previousBlockId: string;
  generatorPublicKey: string;
  blockSignature: string;
  transactions: TransactionModel<any>[];
}
