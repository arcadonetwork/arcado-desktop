import AccountModel, { IAccount } from '../../models/account.model';
import { Dispatch } from '../store';
import { message } from 'antd';
import api from '../../shared/services/api';
import { isObjectWithFields } from '../../shared/utils/type-checking';

const initialState = {
  account: new AccountModel({
    address: "9096358076943957197L"
  }),
  isAuthenticated: false
}

export type SessionState = {
  account: IAccount,
  isAuthenticated: boolean
}

export const session = {
  state: initialState,
  reducers: {
    setAccount: (state: SessionState, payload: IAccount) => {
      return {
        ...state,
        account: payload,
        isAuthenticated: (isObjectWithFields(payload) && payload.address)
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async authenticate (passphrase: string) {
      try {

        const { result } = await api.authenticate(passphrase);
        dispatch.session.setAccount(result)
      } catch (e) {
        message.error('authentication failed | Dummy profile set')
        dispatch.session.setAccount(
          new AccountModel({
            address: "9096358076943957197L"
          })
        )
      }
    },
    logout () {
      dispatch.session.setAccount(new AccountModel(undefined))
    }
  }),
};
