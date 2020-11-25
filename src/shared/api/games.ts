import { request, CUSTOM_NETWORK_BASE_URI } from './request';

import { GameModel } from '../../typings/game.model';
import { isArrayWithElements, isObjectWithFields } from '../../utils/type-checking';
import { fetchAccountInfo } from "./accounts";

import { transactions, codec, cryptography } from "@liskhq/lisk-client";
import { getFullAssetSchema } from '../../utils/common';

import { sendTransactions } from './transactions';

const genesisBlockID = Buffer.from('017192d8da7d20b419b2129ea51f5e9358fb0ea4904366a4ca6f887587bfbda0', 'hex');
const NETWORK_IDENTIFIER = cryptography.getNetworkIdentifier(genesisBlockID, 'ARCD');

const URI = `${CUSTOM_NETWORK_BASE_URI}/api/games`

const createGameAssetSchema = {
  $id: "arcado/game/create",
  type: "object",
  required: ["id", "name", "description", "createdBy"],
  properties: {
    id: {
      dataType: "string",
      fieldNumber: 1,
    },
    name: {
      dataType: "string",
      fieldNumber: 2,
    },
    description: {
      dataType: "string",
      fieldNumber: 3,
    },
    createdBy: {
      dataType: "string",
      fieldNumber: 4,
    },
  },
}

export const createGame = async (game: GameModel, passphrase: string, networkIdentifier: any) => {

  const { publicKey, address } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
  const addressHex = address.toString('hex');
  // @ts-ignore
  const { sequence: { nonce } } = await fetchAccountInfo(addressHex);
  const { id, ...rest } = transactions.signTransaction(
    createGameAssetSchema,
    {
      moduleID: 1000,
      assetID: 1,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows("0.1")),
      senderPublicKey:  publicKey,
      asset: {
        name: game.name,
        description: game.description,
        id: game.id,
        createdBy: addressHex
      },
    },
    NETWORK_IDENTIFIER,
    passphrase
  );


  const input = {
    // @ts-ignore
    tx: codec.codec.toJSON(getFullAssetSchema(createGameAssetSchema), rest)
  };

  return sendTransactions(input.tx);
};

export const getGames = async (): Promise<GameModel[]> => {
  let { data } = await request({
    url: URI,
    method: 'GET'
  });
  if (isArrayWithElements(data)) {
    return data as GameModel[]
  }
  return [];
};

export const getGame = async (gameId: string): Promise<GameModel> => {
  const { data } = await request({
    url: `${URI}/${gameId}`,
    method: 'GET'
  });
  if (isObjectWithFields(data)) {
    return data as GameModel;
  }
  return undefined;
};
