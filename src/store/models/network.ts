import { Dispatch, getState } from '../store';
import { BlockModel } from '../../models/block.model';
import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../models/transaction.model';


const initialState: NetworkState = {
  online: false,
  blockHeight: 0,
  newTransactions: []
}

export type NetworkState = {
  online: boolean,
  blockHeight: number,
  newTransactions: []
}

export const network = {
  state: initialState,
  reducers: {
    setStatusUpdateState: (state: NetworkState, payload: any) => {
      return {
        ...state,
        online: payload.online
      }
    },
    setBlockHeightState: (state: NetworkState, payload: number) => {
      return {
        ...state,
        blockHeight: payload
      }
    },
    setNewTransactionsState: (state: NetworkState, payload: TransactionModel[]) => {
      return {
        ...state,
        newTransactions: payload
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    setStatusUpdate (status: boolean) {
      dispatch.network.setStatusUpdateState(status);
    },
    setBlockHeight (blockHeight: number) {
      dispatch.network.setBlockHeightState(blockHeight);
    },
    newBlockCreated ({ block }: { block: BlockModel }) {

      const state = getState();
      const account = state.account.account;
      const blockHeight = state.network.blockHeight;
      const newTransactions = state.network.newTransactions;

      if (blockHeight < block.height) {
        dispatch.network.setBlockHeight(block.height);
      }

      if (isArrayWithElements(newTransactions) || isArrayWithElements(block.transactions)) {
        dispatch.network.setNewTransactionsState(block.transactions);
      }

      if (!isArrayWithElements(block.transactions)) return;

      dispatch.account.checkTransactionsAndUpdateAccount({
        transactions: block.transactions, account
      });



    }
  }),
};
