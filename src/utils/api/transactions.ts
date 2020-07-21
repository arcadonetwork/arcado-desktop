import { NETWORK_BASE_URI, request } from './request';
import { fromRawLsk } from '../utils/lsk';
import { isArrayWithElements } from '../utils/type-checking';
import TransactionModel from '../../models/transaction.model';

const URI = `${NETWORK_BASE_URI}/transactions`


export const getTransactionsByAddress = async (address: string) => {
  const { data } = await request({
    url: `${URI}?recipientId=${address}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    return data.map((item: any) => {
      const transaction = new TransactionModel(item);
      transaction.amount = fromRawLsk(Number(transaction.amount));
      return transaction;
    })
  }
};

export const getTransactionById = async (txId: string) => {
  const { data } = await request({
    url: `${URI}?id=${txId}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const element = data[0];
    const transaction = new TransactionModel(element);
    transaction.amount = fromRawLsk(Number(transaction.amount));
    return transaction;
  } else {
    return undefined;
  }
};
