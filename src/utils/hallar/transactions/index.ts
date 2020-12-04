import { GithubAccount } from '../typings';
import { codec, cryptography, transactions } from '@liskhq/lisk-client';
import { addGithubAccountSchema } from '../schemas';
import { networkIdentifier } from '../../transactions';
import { getFullAssetSchema } from '../../common';

export const createRegisterGithubIDTransaction = (github: GithubAccount, nonce: string, passphrase: string) => {
  const { publicKey } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);

  const { id, ...rest } = transactions.signTransaction(
    addGithubAccountSchema,
    {
      moduleID: 18999,
      assetID: 1,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows("25")),
      senderPublicKey:  publicKey,
      asset: {
        github : {
          id: github.id,
          username: github.login
        }
      },
    },
    networkIdentifier,
    passphrase
  );
  // @ts-ignore
  return codec.codec.toJSON(getFullAssetSchema(addGithubAccountSchema), rest);
}
