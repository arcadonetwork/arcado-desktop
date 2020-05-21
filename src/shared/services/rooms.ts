import { BASE_URI, request } from './request';
import RoomModel from '../../models/room.model';

const URI = `${BASE_URI}/rooms`

const createRoom = async (gameId: string, room: RoomModel) => {
  return request({
    url: `${URI}/${gameId}`,
    method: 'POST',
    body: room
  });
};

const getGames = async () => {
  return request({
    url: URI,
    method: 'GET'
  });
};

const getGame = async (gameId: string) => {
  return request({
    url: `${URI}/${gameId}`,
    method: 'GET'
  });
};

const getRooms = async (gameId: string) => {
  return request({
    url: `${URI}/${gameId}/rooms`,
    method: 'GET'
  });
};

const getRoom = async (gameId: string, roomId: string) => {
  return request({
    url: `${URI}/${gameId}/rooms/${roomId}`,
    method: 'GET'
  });
};

const getTransactions = async (address: string) => {
  return request({
    url: `${URI}/transactions/${address}`,
    method: 'GET'
  });
};

export const roomsApi = {
  getGames,
  getGame,
  getRooms,
  getRoom,
  getTransactions,
  createRoom
}
