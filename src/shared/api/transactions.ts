import { NETWORK_BASE_URI, request } from './request';
import { fromRawLsk } from '../../utils/currency-converters';
import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../typings/transaction.model';
import { AssetModel } from '../../typings/asset.model';

const NETWORK_URI = `${NETWORK_BASE_URI}/api/transactions`


export const getTransactionById = async (txId: string) => {
  const { data } = await request({
    url: `${NETWORK_URI}/${txId}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel<AssetModel> = data[0];
    const asset = transaction.asset;
    asset.amount = fromRawLsk(Number(asset.amount));
    transaction.asset = asset;
    return transaction;
  } else {
    return undefined;
  }
};

export const sendTransactions = async (tx: any) => {
  return request({
    url: `${NETWORK_URI}`,
    method: "POST",
    body: tx,
  })
};
