import { BASE_URI, request } from './request';

const URI = `${BASE_URI}/users`

const authenticate = async (email: string, passphrase: string) => {
  return request({
    url: `${URI}/${email}`,
    method: 'POST',
    body: {
      passphrase
    }
  });
};

const register = async (email: string) => {
  return request({
    url: `${URI}/register`,
    method: 'POST',
    body: {
      email
    }
  });
};

const getUser = async (email: string) => {
  return request({
    url: `${URI}/${encodeURI(email)}`,
    method: 'GET'
  });
};

const getTransactions = async (email: string) => {
  return request({
    url: `${URI}/${encodeURI(email)}/transactions`,
    method: 'GET'
  });
};

export const usersApi = {
  authenticate,
  register,
  getTransactions,
  getUser
}
