import { BASE_URI, request } from './request';

const URI = `${BASE_URI}/games`

export const getGames = async () => {
  return request({
    url: URI,
    method: 'GET'
  });
};

export const getGame = async (gameId: string) => {
  return request({
    url: `${URI}/${gameId}`,
    method: 'GET'
  });
};

export const getTransactions = async (address: string) => {
  return request({
    url: `${URI}/transactions/${address}`,
    method: 'GET'
  });
};
