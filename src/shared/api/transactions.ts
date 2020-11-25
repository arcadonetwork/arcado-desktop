import { CUSTOM_NETWORK_BASE_URI, NETWORK_BASE_URI, request } from './request';
import { fromRawLsk } from '../../utils/currency-converters';
import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../typings/transaction.model';
import { AssetModel } from '../../typings/asset.model';
import { ApiResponseModel } from '../../typings/api-response.model';

const URI = `${CUSTOM_NETWORK_BASE_URI}/transactions`
const NETWORK_URI = `${NETWORK_BASE_URI}/api/transactions`


export const getTransactionsByAddress = async (address: string): Promise<ApiResponseModel<any>> => {
  const { data, meta } = await request({
    url: `${URI}?asset=recipientId&contains=${address}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const txs = data.map((transaction: TransactionModel<AssetModel>) => {
      const asset = transaction.asset;
      asset.amount = fromRawLsk(Number(asset.amount));
      transaction.asset = asset;
      return transaction;
    })
    return { data: txs, meta }
  }
  return { data, meta }
};

export const getTransactionById = async (txId: string) => {
  const { data } = await request({
    url: `${NETWORK_URI}?id=${txId}`,
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
