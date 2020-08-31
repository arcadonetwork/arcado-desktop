import { API_BASE_URI, NETWORK_BASE_URI, request } from './request';
import { fromRawLsk } from '../lsk';
import { isArrayWithElements } from '../type-checking';

const URI = `${API_BASE_URI}/accounts`
const NETWORK_URI = `${NETWORK_BASE_URI}/api/accounts`

export const getAccount = async (address: string) => {
  const { data } = await request({
    url: `${NETWORK_URI}?address=${encodeURI(address)}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const account = data[0];
    account.balance = fromRawLsk(Number(account.balance));
    return account;
  } else {
    return undefined;
  }
};

export const addFundsToAccount = async (address: string) => {
  return request({
    url: `${URI}/${encodeURI(address)}/funds`,
    method: 'POST'
  });
};
