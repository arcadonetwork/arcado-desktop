import { API_BASE_URI, request } from './request';

const URI = `${API_BASE_URI}/games`

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

/*
export const getGame = async (gameId: string) => {
  const { data } = await request({
    url: `${EXTENDED_NETWORK_BASE_URI}/transactions?asset=gameId&contains=${gameId}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const game: GameModel = data[0];
    return game;
  } else {
    return undefined;
  }
};*/
