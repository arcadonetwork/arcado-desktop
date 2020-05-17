import { Dispatch } from '../store';
import { message } from 'antd';
import api from '../../shared/services/api';

const initialState = false

export type AuthenticationState = boolean

export const authentication = {
  state: initialState,
  reducers: {
    setIsAuthenticated: (state: AuthenticationState, payload: AuthenticationState) => payload,
  },
  effects: (dispatch: Dispatch) => ({
    async authenticate (passphrase: string) {
      try {

        const { result } = await api.authenticate(passphrase);
        dispatch({ type: 'user/setUser', payload: result })
        dispatch({ type: 'authentication/setIsAuthenticated', payload: true })
      } catch (e) {

        message.error('authentication failed | Dummy profile set')

        dispatch({ type: 'user/setUser', payload: {
            userId: "9096358076943957197L"
          }
        })
        dispatch({ type: 'authentication/setIsAuthenticated', payload: true })
      }
    },
  }),
};
