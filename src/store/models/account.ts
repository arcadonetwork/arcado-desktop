import { AccountModel }  from '../../models/account.model';
import { Dispatch } from '../store';
import { getAccount, addFundsToAccount } from '../../utils/api/accounts';
import { isArrayWithElements, isObjectWithFields } from '../../utils/type-checking';
import { TransactionModel } from '../../models/transaction.model';
import { message } from 'antd';
import { AssetModel } from '../../models/asset.model';

const initialState: SessionState = {
  account: {
    address: "813630206057921731L",
    passphrase: "decade draw witness sadness suit junk theory trophy perfect chair sadness wheel",
    publicKey: "d46e9b6487255b4fd2cc112c521b4cde5acc34e3657a2d46f74d4a43326a46b7",
    balance: "0"
  },
  isValidAndSynced: true,
  isValidAndLoading: false,
  isFundingAccount: false,
}

/*const initialState: SessionState = {
  account: undefined,
  isValidAndSynced: false,
  isValidAndLoading: false,
  isFundingAccount: false
};*/

export type SessionState = {
  account: AccountModel,
  isValidAndSynced: boolean,
  isValidAndLoading: boolean,
  isFundingAccount: boolean
}

export const account = {
  state: initialState,
  reducers: {
    setAccountState: (state: SessionState, payload: AccountModel) => {
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
    setFundingAccountState: (state: SessionState, payload: boolean) => {
      return {
        ...state,
        isFundingAccount: payload
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async syncAccount (account: AccountModel) {
      const onChainAccount = await this.findAccount(account.address);
      if (isObjectWithFields(onChainAccount)) {
        account = {
          ...account,
          ...onChainAccount
        }
      }
      this.setAccount(account);
    },
    setAccountLoading (loading: boolean) {
      dispatch.accounts.setAccountLoadingState(loading);
    },
    setFundingAccount (isFundingAccount: boolean) {
      dispatch.accounts.setFundingAccount(isFundingAccount);
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
      dispatch.accounts.setFundingAccountState(true);
      addFundsToAccount(address)
        .then(({ data }) => {
          dispatch.accounts.setFundingAccountState(false);
        }).catch(() => {

        });
    },
    setAccount (account: AccountModel) {
      dispatch.accounts.setAccountState(account);
    },
    logout () {
      dispatch.accounts.setAccount(undefined)
    },
    async checkTransactionsAndUpdateAccount ({ transactions, account } : { transactions: TransactionModel[], account: AccountModel }) {
      if (!isArrayWithElements(transactions)) return;
      const relevantTxs = transactions
        .filter((tx) => {
          const asset = tx.asset as AssetModel;
          return isObjectWithFields(tx) ? (account.address === asset.recipientId || account.address === tx.senderId) : false;
        });
      if (isArrayWithElements(relevantTxs)) {
        await dispatch.accounts.syncAccount(account);
        message.success('Incoming account state change')
      }

    }
  }),
};
