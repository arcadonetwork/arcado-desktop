import * as passphrase from '@liskhq/lisk-passphrase';
import * as cryptography from '@liskhq/lisk-cryptography';
import { inDictionary } from './similarWord';
import { AccountModel } from '../models/account.model';

const { Mnemonic } = passphrase;

export const createAccount = () => {
  const passphrase = Mnemonic.generateMnemonic();
  const keys = cryptography.getPrivateAndPublicKeyFromPassphrase(
    passphrase
  );

  return {
    address: cryptography.getAddressFromPublicKey(keys.publicKey),
    passphrase: passphrase,
    publicKey: keys.publicKey,
    privateKey: keys.privateKey,
    balance: "0"
  }
};

export const isValidPassphrase = (passphrase: string[]) => {
  const normalizedValue = passphrase.join(' ')  || "";
  let isValid;
  try {
    isValid = passphrase.length >= 12 && Mnemonic.validateMnemonic(normalizedValue);
  } catch (e) {
    // If the mnemonic check throws an error, we assume that the
    // passphrase being entered isn't valid
    isValid = false;
  }
  return isValid;
};

export const getPassphraseValidationErrors = (passphrase: string[]) => {
  const partialPassphraseError: boolean[] = [];
  const invalidWords = passphrase.filter((word) => {
    const isNotInDictionary = word !== '' && !inDictionary(word);
    partialPassphraseError[passphrase.indexOf(word)] = isNotInDictionary;
    return isNotInDictionary;
  });

  const filteredPassphrase = passphrase.filter(word => !!word);

  let validationError = 'Passphrase is not valid';

  if (filteredPassphrase.length < 12) {
    validationError = `Passphrase should have 12 words, entered passphrase has ${filteredPassphrase.length}`;
  }

  if (invalidWords.length > 0) {
    validationError = 'Please check the highlighted word and make sure it’s correct.'
  }

  return { validationError, partialPassphraseError, passphraseIsInvalid: invalidWords.length > 0 };
};

export const getAccountByPassphrase = (passphrase: string) => {
  const keys = cryptography.getPrivateAndPublicKeyFromPassphrase(
    passphrase || ''
  );
  const address = cryptography.getAddressFromPublicKey(keys.publicKey  || '');
  const account: AccountModel = {
    address,
    passphrase: passphrase,
    publicKey: keys.publicKey,
    balance: "0"
  }
  return account;
};
