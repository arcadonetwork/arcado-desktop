import { IGame } from './game.model';
import PriceDistributionModel from './price-distribution.model';

export interface IRoom {
  id: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  game?: IGame;
  distribution?: PriceDistributionModel;
  addresses?: string[];
  gameId: string
  status: number
  createdBy: string
  hasStarted: boolean
}

export default class RoomModel implements IRoom {
  id: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  game?: IGame;
  addresses?: string[];
  distribution?: PriceDistributionModel;
  gameId: string
  status: number
  createdBy: string
  hasStarted: boolean

  constructor(room: IRoom) {
    if (room) {
      this.id = room.id;
      this.name = room.name;
      this.maxPlayers = room.maxPlayers;
      this.game = room.game;
      this.addresses = room.addresses
      this.entryFee = room.entryFee
      this.distribution = room.distribution
      this.gameId = room.gameId
      this.status = room.status
      this.createdBy = room.createdBy
      this.hasStarted = true
    }
  }
}
