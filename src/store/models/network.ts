import { Dispatch } from '../store';


const initialState = {
  online: false
}

export type NetworkState = {
  online: boolean
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
  },
  effects: (dispatch: Dispatch) => ({
    setStatusUpdate (status: boolean) {
      dispatch.network.setStatusUpdateState(status);
    }
  }),
};
