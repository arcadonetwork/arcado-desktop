import { AssetModel } from './asset.model';
import { TournamentModel } from './tournament.model';
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
  asset: AssetModel|TournamentModel|GameModel;
}
