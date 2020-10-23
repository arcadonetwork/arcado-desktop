import { NETWORK_BASE_URI } from './request';
import { fromRawLsk } from '../../utils/lsk';
import { isArrayWithElements } from '../../utils/type-checking';
import { APIClient } from 'lisk-elements/dist-node';
import { AccountModel } from '../../models/account.model';

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
