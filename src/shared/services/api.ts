import { request, URI } from './request';

const authenticate = async (passphrase: string) => {
  return request({
    url: URI,
    method: 'POST',
    body: {
      passphrase
    }
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

export default {
  authenticate,
  getGames,
  getGame,
  getRooms,
  getRoom
}
