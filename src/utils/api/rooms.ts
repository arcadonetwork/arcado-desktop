import { API_BASE_URI, NETWORK_BASE_URI, EXTENDED_NETWORK_BASE_URI, request } from './request';
import { isArrayWithElements } from '../type-checking';
import { TransactionModel } from '../../models/transaction.model';
import { RoomModel } from '../../models/room.model';
import { CreateRoomTransaction } from '../transactions/create-room';
import { getAddressAndPublicKeyFromPassphrase } from '@liskhq/lisk-cryptography';
import { config } from '../../config';
import { APIClient } from 'lisk-elements';
import { JoinRoomTransaction } from '../transactions/join-room';
import { utils } from '@liskhq/lisk-transactions';

const URI = `${API_BASE_URI}`

const api = new APIClient([NETWORK_BASE_URI]);

export const createRoom = async (gameId: string, room: RoomModel, passphrase: string) => {
  const { publicKey, address } = getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new CreateRoomTransaction({
    asset: {
      roomId: room.roomId,
      name: room.name,
      gameId: room.gameId,
      entryFee: room.entryFee,
      distribution: {
        first: 50,
        second: 30,
        third: 20
      },
      maxPlayers: room.maxPlayers,
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

export const joinRoom = async (gameId: string, roomId: string, passphrase: string) => {
  const { publicKey, address } = getAddressAndPublicKeyFromPassphrase(passphrase);
  let tx = new JoinRoomTransaction({
    recipientId: address,
    asset: {
      gameId,
      roomId,
      address
    },
    senderPublicKey: publicKey,
    networkIdentifier: config.NETWORK_IDENTIFIER,
    timestamp: utils.getTimeFromBlockchainEpoch(Number(new Date()) - 10000)
  });
  tx.sign(passphrase);
  return api.transactions.broadcast(tx.toJSON());
};

export const startRoom = async (gameId: string, roomId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}/start`,
    method: 'POST',
    body: room
  });
};

export const stopRoom = async (gameId: string, roomId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}/stop`,
    method: 'POST',
    body: room
  });
};

export const getRooms = async (gameId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=gameId&contains=${gameId}&type=30`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    console.log(data);
    return data.map((transaction: TransactionModel) => transaction.asset as RoomModel)
  }
};

export const getRoom = async (roomId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=roomId&contains=${roomId}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel = data[0];
    return transaction.asset as RoomModel;
  }
  return undefined;
};

export const getPlayers = async (roomId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=roomId&contains=${roomId}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel = data[0];
    return transaction.asset as RoomModel;
  }
  return undefined;
};
