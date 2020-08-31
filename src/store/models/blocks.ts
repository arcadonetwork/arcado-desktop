import { Dispatch } from '../store';
import { BlockModel } from '../../models/block.model';
import { AccountModel } from '../../models/account.model';


const initialState = {

}

export type BlocksState = {
}

export const blocks = {
  state: initialState,
  reducers: {

  },
  effects: (dispatch: Dispatch) => ({
    newBlockCreated ({ block, account }: { block: BlockModel, account: AccountModel }) {
      dispatch.accounts.checkTransactionsAndUpdateAccount({
        transactions: block.transactions, account
      });
    }
  }),
};
