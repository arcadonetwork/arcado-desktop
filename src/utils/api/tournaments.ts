import { NETWORK_BASE_URI, EXTENDED_NETWORK_BASE_URI, request } from './request';
import { isArrayWithElements } from '../type-checking';
import { TransactionModel } from '../../models/transaction.model';
import { TournamentModel } from '../../models/tournament.model';
import { CreateTournamentTransaction } from '../transactions/create-tournament';
import { getAddressAndPublicKeyFromPassphrase } from '@liskhq/lisk-cryptography';
import { config } from '../../config';
import { APIClient } from 'lisk-elements';
import { JoinTournamentTransaction } from '../transactions/join-tournament';
import { utils } from '@liskhq/lisk-transactions';
import { StartTournamentTransaction } from '../transactions/start-tournament';
import { StopTournamentTransaction } from '../transactions/stop-tournament';
import { ParticipantModel } from '../../models/participant.model';

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
        first: 50,
        second: 30,
        third: 20
      },
      maxPlayers: tournament.maxPlayers,
      address: address,
      recipientId: address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: utils.getTimeFromBlockchainEpoch(Number(new Date()) - 10000)
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
    timestamp: utils.getTimeFromBlockchainEpoch(Number(new Date()) - 10000)
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
    timestamp: utils.getTimeFromBlockchainEpoch(Number(new Date()) - 10000)
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
    timestamp: utils.getTimeFromBlockchainEpoch(Number(new Date()) - 10000)
  });

  tx.sign(passphrase);

  return api.transactions.broadcast(tx.toJSON())
};

export const getTournaments = async (gameId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=gameId&contains=${gameId}&type=30`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    return data.map((transaction: TransactionModel) => transaction.asset as TournamentModel)
  }
};

export const getTournament = async (tournamentId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=tournamentId&contains=${tournamentId}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel = data[0];
    return transaction.asset as TournamentModel;
  }
  return undefined;
};

export const getPlayers = async (tournamentId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=tournamentId&contains=${tournamentId}&type=31`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    return data.map((transaction: TransactionModel) => transaction.asset as ParticipantModel)
  }
  return undefined;
};
