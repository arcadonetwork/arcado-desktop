import { request } from './request';
import { fromRawLsk } from '../../utils/currency-converters';
import { isObjectWithFields } from '../../utils/type-checking';
import { AccountModel } from '../../typings/account';

export const fetchAccountInfo = async (address: string) => {
  const { data } : { data: AccountModel } = await request({
    url: `http://localhost:4000/api/accounts/${address}`,
    method: 'GET'
  });
  if (isObjectWithFields(data)) {
    data.token.balance = fromRawLsk(Number(data.token.balance));
    return data;
  }
  return undefined;
};
