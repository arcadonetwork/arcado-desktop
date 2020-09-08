import { Dispatch } from '../store';

export type SessionState = {
  isCreatingGame: boolean
}

const initialState: SessionState = {
  isCreatingGame: false
}

export const games = {
  state: initialState,
  reducers : {
    setIsCreatingGame(state: SessionState, val: boolean): any {
      return {
        ...state,
        isCreatingGame: val
      }
    }
  },
  effects: (dispatch: Dispatch) => ({

  })
}
