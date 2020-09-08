import { NETWORK_BASE_URI, EXTENDED_NETWORK_BASE_URI, request } from './request';
import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../models/transaction.model';
import { TournamentModel } from '../../models/tournament.model';
import { getAddressAndPublicKeyFromPassphrase } from '@liskhq/lisk-cryptography';
import { config } from '../../config';
import { APIClient } from 'lisk-elements';
import { ParticipantModel } from '../../models/participant.model';
import { createNetworkTs } from '../../utils/dates';
import {
  CreateTournamentTransaction,
  JoinTournamentTransaction,
  StartTournamentTransaction,
  StopTournamentTransaction, utils } from '@arcado/arcado-transactions';

const { TRANSACTION_TYPES } = utils;

const api = new APIClient([NETWORK_BASE_URI]);


export const createTournament = async (gameId: string, tournament: TournamentModel, passphrase: string) => {
  const { publicKey, address } = getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new CreateTournamentTransaction({
    asset: {
      tournamentId: tournament.tournamentId,
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

  tx.sign(passphrase);
  return api.transactions.broadcast(tx.toJSON());
};

export const joinTournament = async (gameId: string, tournamentId: string, passphrase: string) => {
  const { publicKey, address } = getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new JoinTournamentTransaction({
    recipientId: address,
    asset: {
      gameId,
      tournamentId,
      address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });
  tx.sign(passphrase);
  return api.transactions.broadcast(tx.toJSON());
};

export const startTournament = async (gameId: string, tournamentId: string, passphrase: string) => {
  const { publicKey, address } = getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new StartTournamentTransaction({
    recipientId: address,
    asset: {
      tournamentId,
      address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });

  tx.sign(passphrase);

  return api.transactions.broadcast(tx.toJSON())
};

export const stopTournament = async (gameId: string, tournamentId: string,  tournament: any, passphrase: string) => {
  const { publicKey, address } = getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new StopTournamentTransaction({
    recipientId: address,
    asset: {
      tournamentId,
      address,
      first: tournament.first,
      second: tournament.second,
      third: tournament.third
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: createNetworkTs()
  });

  tx.sign(passphrase);

  return api.transactions.broadcast(tx.toJSON())
};

export const getTournaments = async (gameId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=gameId&contains=${gameId}&type=${TRANSACTION_TYPES.TOURNAMENTS}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    return data.map((transaction: TransactionModel) => transaction.asset as TournamentModel)
  }
};

export const getTournament = async (tournamentId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=tournamentId&contains=${tournamentId}&type=${TRANSACTION_TYPES.TOURNAMENTS}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel = data[0];
    return transaction.asset as TournamentModel;
  }
  return undefined;
};

export const getTournamentState = async (tournament: TournamentModel, address: string) => {
  const tournamentId = tournament.tournamentId;
  const { data: endGame } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=tournamentId&contains=${tournamentId}&type=${TRANSACTION_TYPES.STOP_TOURNAMENT}`,
    method: 'GET'
  });
  if (isArrayWithElements(endGame)) return { type: 4, endResult: endGame[0].asset }; // FINISHED

  const { data: startGame } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=tournamentId&contains=${tournamentId}&type=${TRANSACTION_TYPES.START_TOURNAMENT}`,
    method: 'GET'
  });
  if (isArrayWithElements(startGame)) return { type: 3 }; // STARTED

  const participants = await getParticipants(tournamentId);
  if (isArrayWithElements(participants) && participants.length === Number(tournament.maxPlayers)) return { type: 2 }; // CAN START
  if (isArrayWithElements(participants) && participants.map((item: ParticipantModel) => item.address).includes(address)) return { type: 1 }; // ALREADY JOINED
  return { type: 0 }; // CAN JOIN
};

export const getParticipants = async (tournamentId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=tournamentId&contains=${tournamentId}&type=${TRANSACTION_TYPES.JOIN_TOURNAMENT}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    return data.map((transaction: TransactionModel) => transaction.asset as ParticipantModel)
  }
  return undefined;
};
