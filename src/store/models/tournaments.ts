import { Dispatch } from '../store';

export type SessionState = {
  isCreatingTournament: boolean
}

const initialState: SessionState = {
  isCreatingTournament: false
}

export const tournaments = {
  state: initialState,
  reducers : {
    setIsCreatingTournament(state: SessionState, val: boolean): any {
      return {
        ...state,
        isCreatingTournament: val
      }
    }
  },
  effects: (dispatch: Dispatch) => ({

  })
}
