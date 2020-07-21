import TransactionModel from './transaction.model';
export interface IBlock {
  height: string;
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
  transactions: TransactionModel[];
}

export default class BlockModel implements IBlock {
  height: string;
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
  transactions: TransactionModel[];

  constructor(block: IBlock) {
    if (block) {
      this.version = block.version;
      this.totalAmount = block.totalAmount;
      this.totalFee = block.totalFee;
      this.reward = block.reward;
      this.payloadHash = block.payloadHash;
      this.timestamp = block.timestamp;
      this.numberOfTransactions = block.numberOfTransactions;
      this.payloadLength = block.payloadLength;
      this.previousBlockId = block.previousBlockId;
      this.generatorPublicKey = block.generatorPublicKey;
      this.blockSignature = block.blockSignature;
    }
  }
}

