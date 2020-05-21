import { BASE_URI, request } from './request';

const URI = `${BASE_URI}/games`

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

const getTransactions = async (address: string) => {
  return request({
    url: `${URI}/transactions/${address}`,
    method: 'GET'
  });
};

export const gamesApi = {
  getGames,
  getGame,
  getTransactions
}
