import { BASE_URI, request } from './request';
import { fromRawLsk } from '../utils/lsk';
import { isObjectWithFields } from '../utils/type-checking';
import TransactionModel from '../../models/transaction.model';

const URI = `${BASE_URI}/transactions`


export const getTransactionsByAddress = async (address: string) => {
  return request({
    url: `${URI}?address=${address}`,
    method: 'GET'
  });
};

export const getTransactionById = async (txId: string) => {
  const { data } = await request({
    url: `${URI}/${encodeURI(txId)}`,
    method: 'GET'
  });
  if (isObjectWithFields(data)) {
    const transaction = new TransactionModel(data);
    transaction.amount = fromRawLsk(Number(transaction.amount));
    return transaction;
  } else {
    return undefined;
  }
};
