export interface IGame {
  id: string;
  title: string;
  description?: string;
}

export default class GameModel implements IGame {
  id: string;
  title: string;
  description?: string;

  constructor(game: IGame) {
    if (game) {
      this.id = game.id;
      this.title = game.title;
      this.description = game.description;
    }
  }
}
