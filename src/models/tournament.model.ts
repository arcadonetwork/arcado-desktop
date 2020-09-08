import { GameModel } from './game.model';
import { PriceDistributionModel } from './price-distribution.model';

export type TournamentModel = {
  tournamentId: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  game?: GameModel;
  distribution?: PriceDistributionModel;
  gameId: string
  createdBy?: string
  address?: string
}
