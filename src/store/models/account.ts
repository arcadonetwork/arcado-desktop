import { AccountModel }  from '../../typings/account';
import { Dispatch } from '../store';
import { fetchAccountInfo } from '../../shared/api/accounts';
import { isArrayWithElements, isObjectWithFields } from '../../utils/type-checking';
import { TransactionModel } from '../../typings/transaction.model';
import { AssetModel } from '../../typings/asset.model';

const initialState: SessionState = {
  account: {
    address: "2cf19a24ae7970a4e80955eaa03d87b0402858e3",
    passphrase: "aerobic output pool dinner pattern absurd tunnel address enlist viable unable sibling",
    keys : {
      publicKey: "b958c831d69695d7eb7d0e180272e4e4ba199aabfa9fc52a0b5f77694dcd5b57",
      privateKey: "94b0b1b948a5d4acf0ab1102aadccffb4aa121b46a1bcf1e9995ca71b2644704b958c831d69695d7eb7d0e180272e4e4ba199aabfa9fc52a0b5f77694dcd5b57",
    },
    token: {
      balance: "0"
    },
    dpos: {
      delegate : {
        username: 'helloworld',
        consecutiveMissedBlocks: 0,
        isBanned: false,
        lastForgedHeight: 0,
        pomHeights: [],
        totalVotesReceived: "0"
      },
      sentVotes: [],
      unlocking: []
    }
  },
  isValidAndSynced: true,
  isValidAndLoading: false,
  hasAuthenticated: false
}

/*const initialState: SessionState = {
  account: undefined,
  hasAuthenticated: false,
  isValidAndSynced: false,
  isValidAndLoading: false
};*/


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
        return await fetchAccountInfo(address)
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
