import { IGame } from './game.model';
import { IParticipant } from './participant.model';
import PriceDistributionModel from './price-distribution.model';

export interface IRoom {
  id: string;
  title: string;
  players: number;
  bet: number;
  buyin?: number;
  game?: IGame;
  distribution?: PriceDistributionModel;
  participants?: IParticipant[];
}

export default class RoomModel implements IRoom {
  id: string;
  title: string;
  players: number;
  bet: number;
  buyin?: number;
  game?: IGame;
  participants?: IParticipant[];
  distribution?: PriceDistributionModel;

  constructor(game: IRoom) {
    if (game) {
      this.id = game.id;
      this.title = game.title;
      this.players = game.players;
      this.bet = game.bet;
      this.game = game.game;
      this.participants = game.participants
      this.buyin = game.buyin
      this.distribution = game.distribution
    }
  }
}
