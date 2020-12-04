import { Dispatch, getState } from '../store';
//import { BlockModel } from '../../typings/block.model';
//import { isArrayWithElements } from '../../utils/type-checking';
import { TransactionModel } from '../../typings/transaction.model';
import { NetworkModel } from '../../typings/network.model';
import { getTransactionById } from '../../shared/api/transactions';


const initialState: NetworkState = {
  online: false,
  blockHeight: 0,
  newTransactions: [],
  targetNetwork: undefined,
  actionBroadcast: undefined
}

/*const initialState: NetworkState = {
  online: true,
  blockHeight: 0,
  newTransactions: [],
  targetNetwork:  {
    name: 'Alphanet',
    identifier: 'alphanet',
    nodeUrl: "http://localhost:5000",
    wsPort: 8000
  },
  actionBroadcast: undefined
}*/

export type NetworkState = {
  online: boolean,
  blockHeight: number,
  newTransactions: [],
  targetNetwork: NetworkModel,
  actionBroadcast: any
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
    setNewTransactionsState: (state: NetworkState, payload: TransactionModel<any>[]) => {
      return {
        ...state,
        newTransactions: payload
      }
    },
    setTargetNetwork: (state: NetworkState, payload: NetworkModel) => {
      return {
        ...state,
        targetNetwork: payload
      }
    },
    setActionBroadcast: (state: NetworkState, payload: number) => {
      return {
        ...state,
        actionBroadcast: payload
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
    async newTransactionFound (id: string) {

      const block = await getTransactionById(id);

      const state = getState();
      //const account = state.account.account;
      const blockHeight = state.network.blockHeight;
      //const newTransactions = state.network.newTransactions;

      if (blockHeight < block.height) {
        dispatch.network.setBlockHeight(block.height);
      }

      /*if (isArrayWithElements(newTransactions) || isArrayWithElements(block.transactions)) {
        dispatch.network.setNewTransactionsState(block.transactions);
      }

      if (!isArrayWithElements(block.transactions)) return;

      dispatch.account.checkTransactionsAndUpdateAccount({
        transactions: block.transactions, account
      });*/

    }
  }),
};
