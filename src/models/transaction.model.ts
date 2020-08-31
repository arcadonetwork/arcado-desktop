import { AssetModel } from './asset.model';
import { RoomModel } from './room.model';
import { GameModel } from './game.model';

export type TransactionModel = {
  id: string;
  height: number;
  blockId: string;
  type: number;
  timestamp: number;
  senderPublicKey: string;
  senderId: string;
  signature: string;
  asset: AssetModel|RoomModel|GameModel;
}
