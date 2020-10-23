import { AccountModel }  from '../../models/account.model';
import { Dispatch } from '../store';
import { getAccount } from '../../shared/api/accounts';
import { isArrayWithElements, isObjectWithFields } from '../../utils/type-checking';
import { TransactionModel } from '../../models/transaction.model';
import { AssetModel } from '../../models/asset.model';

/*const initialState: SessionState = {
  account: {
    address: "813630206057921731L",
    passphrase: "decade draw witness sadness suit junk theory trophy perfect chair sadness wheel",
    publicKey: "d46e9b6487255b4fd2cc112c521b4cde5acc34e3657a2d46f74d4a43326a46b7",
    balance: "0"
  },
  isValidAndSynced: true,
  isValidAndLoading: false,
  hasAuthenticated: false
}*/


const initialState: SessionState = {
  account: undefined,
  hasAuthenticated: false,
  isValidAndSynced: false,
  isValidAndLoading: false
};


export type SessionState = {
  account: AccountModel,
  hasAuthenticated: boolean,
  isValidAndSynced: boolean,
  isValidAndLoading: boolean
}

export const account = {
  state: initialState,
  reducers: {
    setAccount: (state: SessionState, payload: AccountModel) => {
      return {
        ...state,
        account: payload,
        hasAuthenticated: (isObjectWithFields(payload) && payload.address),
        isValidAndLoading: false,
      }
    },
    logoutState: (state: SessionState, payload: AccountModel) => {
      return initialState
    },
    setAccountLoading: (state: SessionState, payload: boolean) => {
      return {
        ...state,
        isValidAndLoading: payload
      }
    },
    setAccountSynced: (state: SessionState, payload: boolean) => {
      return {
        ...state,
        isValidAndSynced: payload
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async syncAccount (account: AccountModel) {
      if (!isObjectWithFields(account)) return;
      const onChainAccount = await this.findAccount(account.address);
      if (isObjectWithFields(onChainAccount)) {
        account = {
          ...account,
          ...onChainAccount
        }
      }
      dispatch.account.setAccount(account);
      dispatch.account.setAccountSynced(true)
    },
    async findAccount (address: string) {
      try {
        return await getAccount(address)
      } catch (e) {
        return undefined;
      }
    },
    logout () {
      dispatch.account.logoutState(undefined)
      dispatch.network.setTargetNetwork(undefined)
    },
    async checkTransactionsAndUpdateAccount ({ transactions, account } : { transactions: TransactionModel<AssetModel>[], account: AccountModel }) {
      if (!isObjectWithFields(account)) return;
      const relevantTxs = transactions
        .filter((tx) => {
          const asset = tx.asset;
          return account.address === asset.recipientId || account.address === tx.senderId;
        });
      if (isArrayWithElements(relevantTxs)) {
        await dispatch.account.syncAccount(account);
      }

    }
  }),
};
