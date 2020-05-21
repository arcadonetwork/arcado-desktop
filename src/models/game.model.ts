export interface IGame {
  id: string;
  name: string;
  description?: string;
}

export default class GameModel implements IGame {
  id: string;
  name: string;
  description?: string;

  constructor(game: IGame) {
    if (game) {
      this.id = game.id;
      this.name = game.name;
      this.description = game.description;
    }
  }
}
