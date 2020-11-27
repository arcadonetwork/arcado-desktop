import { request, NETWORK_BASE_URI } from './request';

import { isArrayWithElements } from '../../utils/type-checking';
import { ApiResponseModel } from '../../typings/api-response.model';
import { ForgerModel } from '../../typings/forger';
import { sendTransactions } from './transactions';
import { networkIdentifier } from '../../utils/transactions';
import { fetchAccountInfo } from './accounts';
import { getFullAssetSchema } from '../../utils/common';

import { transactions, codec, cryptography } from "@liskhq/lisk-client";

const URI = `${NETWORK_BASE_URI}/api/forgers`

export const fetchDelegates = async (): Promise<ApiResponseModel<ForgerModel[]>> => {
  let response = await request({
    url: URI,
    method: 'GET'
  });
  if (isArrayWithElements(response.data)) {
    return response;
  }
  return { data: [], meta: undefined }
};

const registerDelegateSchema = {
  $id: 'lisk/dpos/register',
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      dataType: 'string',
      fieldNumber: 1,
      minLength: 1,
      maxLength: 20,
    },
  },
};


export const registerDelegate = async (username: string, passphrase: string) => {

  const { publicKey, address } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
  const addressHex = address.toString('hex');
  // @ts-ignore
  const { sequence: { nonce } } = await fetchAccountInfo(addressHex);

  const { id, ...rest } = transactions.signTransaction(
    registerDelegateSchema,
    {
      moduleID: 5,
      assetID: 0,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows("25")),
      senderPublicKey:  publicKey,
      asset: {
        username
      },
    },
    networkIdentifier,
    passphrase
  );

  const input = {
    // @ts-ignore
    tx: codec.codec.toJSON(getFullAssetSchema(registerDelegateSchema), rest)
  };
  return sendTransactions(input.tx);
};
