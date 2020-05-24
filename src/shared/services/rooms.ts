import { BASE_URI, request } from './request';

const URI = `${BASE_URI}`

const createRoom = async (gameId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms`,
    method: 'POST',
    body: room
  });
};

const join = async (gameId: string, roomId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}/join`,
    method: 'POST',
    body: room
  });
};

const start = async (gameId: string, roomId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}/join`,
    method: 'POST',
    body: room
  });
};

const stop = async (gameId: string, roomId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}/join`,
    method: 'POST',
    body: room
  });
};

const getRooms = async (gameId: string) => {
  return request({
    url: `${URI}/games/${gameId}/rooms`,
    method: 'GET'
  });
};

const getRoom = async (gameId: string, roomId: string) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}`,
    method: 'GET'
  });
};

export const roomsApi = {
  getRooms,
  getRoom,
  createRoom,
  join,
  start,
  stop
}
