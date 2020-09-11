import { EXTENDED_NETWORK_BASE_URI, NETWORK_BASE_URI, request } from './request';
import { CreateGameTransaction, utils } from '@arcado/arcado-transactions';
import { config } from '../../config';
import { getAddressAndPublicKeyFromPassphrase } from '@liskhq/lisk-cryptography';
import { APIClient } from 'lisk-elements/dist-node';
import { GameModel } from '../../models/game.model';
import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../models/transaction.model';
import { createNetworkTs } from '../../utils/dates';
import { ApiResponseModel } from '../../models/api-response.model';

const { TRANSACTION_TYPES } = utils;
const api = new APIClient([NETWORK_BASE_URI]);

export const createGame = async (game: GameModel, passphrase: string) => {
  const { publicKey, address } = getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new CreateGameTransaction({
    asset: {
      name: game.name,
      description: game.description,
      gameId: game.gameId,
      createdBy: address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });

  tx.sign(passphrase);
  return api.transactions.broadcast(tx.toJSON());
};

export const getGames = async (): Promise<ApiResponseModel<GameModel>> => {
  let { data, meta }: any = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=gameId&type=${TRANSACTION_TYPES.GAMES}`,
    method: 'GET'
  });
  return { data, meta }
};

export const getGame = async (gameId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=gameId&contains=${gameId}&type=${TRANSACTION_TYPES.GAMES}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel<GameModel> = data[0];
    return transaction.asset as GameModel;
  }
  return undefined;
};
