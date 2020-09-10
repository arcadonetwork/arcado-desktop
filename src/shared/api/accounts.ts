import { API_BASE_URI, NETWORK_BASE_URI, request } from './request';
import { fromRawLsk } from '../../utils/lsk';
import { isArrayWithElements } from '../../utils/type-checking';
import { APIClient } from 'lisk-elements/dist-node';
import { AccountModel } from '../../models/account.model';

const URI = `${API_BASE_URI}/accounts`

const api = new APIClient([NETWORK_BASE_URI]);

export const getAccount = async (address: string) => {
  const { data }: any = await api.accounts.get({ address : encodeURI(address) })
  if (isArrayWithElements(data)) {
    const account: AccountModel = data[0];
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
