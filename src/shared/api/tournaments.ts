import { CUSTOM_NETWORK_BASE_URI, request } from './request';
import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../typings/transaction.model';
import { TournamentModel } from '../../typings/tournament.model';
import { ParticipantModel } from '../../typings/participant.model';
import { utils } from '@arcado/arcado-transactions';
import { ApiResponseModel } from '../../typings/api-response.model';

const { TRANSACTION_TYPES } = utils;


const URI = `${CUSTOM_NETWORK_BASE_URI}/api/tournaments`


export const createTournament = async (gameId: string, tournament: TournamentModel, passphrase: string) => {
  /*const { publicKey, address } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new CreateTournamentTransaction({
    asset: {
      id: tournament.id,
      name: tournament.name,
      gameId: tournament.gameId,
      entryFee: tournament.entryFee,
      distribution: {
        first: Number(tournament.distribution.first),
        second: Number(tournament.distribution.second),
        third: Number(tournament.distribution.third)
      },
      maxPlayers: tournament.maxPlayers,
      createdBy: address,
      recipientId: address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });

  tx.sign(passphrase);*/
  //return api.transactions.broadcast(tx.toJSON());
};

export const joinTournament = async (gameId: string, id: string, passphrase: string) => {
  /*const { publicKey, address } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new JoinTournamentTransaction({
    recipientId: address,
    asset: {
      gameId,
      id,
      address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });
  tx.sign(passphrase);*/
  //return api.transactions.broadcast(tx.toJSON());
};

export const startTournament = async (gameId: string, id: string, passphrase: string) => {
  /*const { publicKey, address } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new StartTournamentTransaction({
    recipientId: address,
    asset: {
      id,
      address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });

  tx.sign(passphrase);*/

  //return api.transactions.broadcast(tx.toJSON())
};

export const stopTournament = async (gameId: string, id: string,  tournament: any, passphrase: string) => {
  /*const { publicKey, address } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new StopTournamentTransaction({
    recipientId: address,
    asset: {
      id,
      address,
      first: tournament.first,
      second: tournament.second,
      third: tournament.third
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });

  tx.sign(passphrase);*/

  //return api.transactions.broadcast(tx.toJSON())
};

export const getTournaments = async (gameId: string): Promise<TournamentModel[]> => {
  const { data } = await request({
    url: `${URI}?gameId=${gameId}`,
    method: 'GET'
  });
  return data;
};

export const getTournamentsByParams = async (parameters: any = {}): Promise<ApiResponseModel<TournamentModel>> => {
  /*const { data, meta } = await api.transactions.get({
    type: TRANSACTION_TYPES.TOURNAMENTS,
    ...parameters
  }) as ApiResponseModel<TournamentModel>;*/
  return { data: undefined, meta: undefined };
};

export const getTournament = async (id: string): Promise<TournamentModel> => {
  const { data } = await request({
    url: `${CUSTOM_NETWORK_BASE_URI}/transactions?asset=id&contains=${id}&type=${TRANSACTION_TYPES.TOURNAMENTS}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel<TournamentModel> = data[0];
    return transaction.asset;
  }
  return undefined;
};

export const getTournamentState = async (tournament: TournamentModel, address: string) => {
  const id = tournament.id;
  const { data: endGame } = await request({
    url: `${CUSTOM_NETWORK_BASE_URI}/transactions?asset=id&contains=${id}&type=${TRANSACTION_TYPES.STOP_TOURNAMENT}`,
    method: 'GET'
  });
  if (isArrayWithElements(endGame)) return { type: 4, endResult: endGame[0].asset }; // FINISHED

  const { data: startGame } = await request({
    url: `${CUSTOM_NETWORK_BASE_URI}/transactions?asset=id&contains=${id}&type=${TRANSACTION_TYPES.START_TOURNAMENT}`,
    method: 'GET'
  });
  if (isArrayWithElements(startGame)) return { type: 3 }; // STARTED

  const participants = (await getParticipants(id)).data;
  if (isArrayWithElements(participants) && participants.length === Number(tournament.maxPlayers)) return { type: 2 }; // CAN START
  if (isArrayWithElements(participants) && participants.map((item: ParticipantModel) => item.address).includes(address)) return { type: 1 }; // ALREADY JOINED
  return { type: 0 }; // CAN JOIN
};

export const getParticipants = async (id: string): Promise<ApiResponseModel<ParticipantModel[]>> => {
  const { data, meta } = await request({
    url: `${CUSTOM_NETWORK_BASE_URI}/transactions?asset=id&contains=${id}&type=${TRANSACTION_TYPES.JOIN_TOURNAMENT}`,
    method: 'GET'
  });
  return { data, meta }
};
