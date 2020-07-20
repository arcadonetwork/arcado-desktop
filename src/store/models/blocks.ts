import { Dispatch } from '../store';
import BlockModel from '../../models/block.model';


const initialState = {

}

export type BlocksState = {
}

export const blocks = {
  state: initialState,
  reducers: {

  },
  effects: (dispatch: Dispatch) => ({
    newBlockCreated (block: BlockModel) {
      console.log(block);
    }
  }),
};
