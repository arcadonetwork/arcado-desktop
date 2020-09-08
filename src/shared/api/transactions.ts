import { EXTENDED_NETWORK_BASE_URI, NETWORK_BASE_URI, request } from './request';
import { fromRawLsk } from '../../utils/lsk';
import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../models/transaction.model';
import { AssetModel } from '../../models/asset.model';

const URI = `${EXTENDED_NETWORK_BASE_URI}/transactions`
const NETWORK_URI = `${NETWORK_BASE_URI}/api/transactions`


export const getTransactionsByAddress = async (address: string) => {
  const { data } = await request({
    url: `${URI}?asset=recipientId&contains=${address}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    return data.map((transaction: TransactionModel) => {
      const asset = transaction.asset as AssetModel;
      asset.amount = fromRawLsk(Number(asset.amount));
      transaction.asset = asset;
      return transaction;
    })
  }
};

export const getTransactionById = async (txId: string) => {
  const { data } = await request({
    url: `${NETWORK_URI}?id=${txId}`,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    const transaction: TransactionModel = data[0];
    const asset = transaction.asset as AssetModel;
    asset.amount = fromRawLsk(Number(asset.amount));
    transaction.asset = asset;
    return transaction;
  } else {
    return undefined;
  }
};
