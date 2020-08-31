import { GameModel } from './game.model';
import { PriceDistributionModel } from './price-distribution.model';
import { EndResultModel } from './end-result.model';

export type RoomModel = {
  roomId: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  game?: GameModel;
  distribution?: PriceDistributionModel;
  endResult?: EndResultModel;
  gameId: string
  status?: number
  createdBy?: string
}
