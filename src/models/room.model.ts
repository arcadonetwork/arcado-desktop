export interface IRoom {
  id: string;
  title: string;
  players: number;
  bet: number;
}

export default class RoomModel implements IRoom {
  id: string;
  title: string;
  players: number;
  bet: number;

  constructor(game: IRoom) {
    if (game) {
      this.id = game.id;
      this.title = game.title;
      this.players = game.players;
      this.bet = game.bet;
    }
  }
}
