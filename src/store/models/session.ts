import AccountModel, { IAccount } from '../../models/account.model';
import { Dispatch } from '../store';
import { getAccount, addFundsToAccount } from '../../utils/api/accounts';
import { isObjectWithFields } from '../../utils/utils/type-checking';

const initialState = {
  account: new AccountModel({
    address: "813630206057921731L",
    passphrase: "decade draw witness sadness suit junk theory trophy perfect chair sadness wheel",
    publicKey: "d46e9b6487255b4fd2cc112c521b4cde5acc34e3657a2d46f74d4a43326a46b7",
    balance: "100000"
  }),
  isValidAndSynced: true,
  isValidAndLoading: false
}

/*const initialState = {
  account: new AccountModel(undefined),
  isValidAndSynced: false,
  isValidAndLoading: false
}*/

export type SessionState = {
  account: IAccount,
  isValidAndSynced: boolean,
  syncingAccount: boolean
}

export const session = {
  state: initialState,
  reducers: {
    setAccountState: (state: SessionState, payload: IAccount) => {
      return {
        ...state,
        account: payload,
        isValidAndSynced: (isObjectWithFields(payload) && payload.address),
        isValidAndLoading: false,
      }
    },
    setAccountLoadingState: (state: SessionState, payload: boolean) => {
      return {
        ...state,
        isValidAndLoading: payload
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async setValidAccount (account: AccountModel) {
      const onChainAccount = await this.findAccount(account.address);
      if (isObjectWithFields(onChainAccount)) {
        account = {
          ...account,
          ...onChainAccount
        }
      }
      this.setAccount(new AccountModel(account));
    },
    setAccountLoading (loading: boolean) {
      dispatch.session.setAccountLoadingState(loading);
    },
    async findAccount (address: string) {
      try {
        return await getAccount(address)
      } catch (e) {
        console.error(e)
        return undefined;
      }
    },
    addFunds (address: string) {
      addFundsToAccount(address)
        .then(({ data }) => {

        }).catch(() => {

        });
    },
    setAccount (account: AccountModel) {
      dispatch.session.setAccountState(account);
    },
    logout () {
      dispatch.session.setAccount(new AccountModel(undefined))
    }
  }),
};
