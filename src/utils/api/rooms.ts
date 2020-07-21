import { API_BASE_URI, request } from './request';

const URI = `${API_BASE_URI}`


export const createRoom = async (gameId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms`,
    method: 'POST',
    body: room
  });
};

export const joinRoom = async (gameId: string, roomId: string, room: object) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}/join`,
    method: 'POST',
    body: room
  });
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
  return request({
    url: `${URI}/games/${gameId}/rooms`,
    method: 'GET'
  });
};

export const getRoom = async (gameId: string, roomId: string) => {
  return request({
    url: `${URI}/games/${gameId}/rooms/${roomId}`,
    method: 'GET'
  });
};
