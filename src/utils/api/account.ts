import { BASE_URI, request } from './request';

const URI = `${BASE_URI}/users`

export const authenticate = async (email: string, passphrase: string) => {
  return request({
    url: `${URI}/${email}`,
    method: 'POST',
    body: {
      email,
      passphrase
    }
  });
};

export const registerAccount = async (email: string) => {
  return request({
    url: `${URI}/register`,
    method: 'POST',
    body: {
      email
    }
  });
};

export const getAccount = async (email: string) => {
  return request({
    url: `${URI}/${encodeURI(email)}`,
    method: 'GET'
  });
};

export const getTransactionsByAddress = async (email: string) => {
  return request({
    url: `${URI}/${encodeURI(email)}/transactions`,
    method: 'GET'
  });
};
