import { IGame } from './game.model';
import PriceDistributionModel, { IPriceDistribution } from './price-distribution.model';
import EndResultModel, { IEndResult } from './end-result.model';

export interface IRoom {
  roomId: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  game?: IGame;
  distribution?: IPriceDistribution;
  endResult?: IEndResult;
  addresses?: string[];
  gameId: string
  status: number
  createdBy: string
}

export default class RoomModel implements IRoom {
  roomId: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  game?: IGame;
  addresses?: string[];
  distribution?: PriceDistributionModel;
  gameId: string
  status: number
  createdBy: string
  endResult: EndResultModel

  constructor(room: IRoom) {
    if (room) {
      this.roomId = room.roomId;
      this.name = room.name;
      this.maxPlayers = room.maxPlayers;
      this.game = room.game;
      this.addresses = room.addresses
      this.entryFee = room.entryFee
      this.distribution = room.distribution
      this.gameId = room.gameId
      this.status = room.status
      this.createdBy = room.createdBy
      this.endResult = room.endResult
    }
  }
}
