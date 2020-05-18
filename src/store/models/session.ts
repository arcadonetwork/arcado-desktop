import UserModel, { IUser } from '../../models/user.model';
import { Dispatch } from '../store';
import { message } from 'antd';
import api from '../../shared/services/api';
import { isObjectWithFields } from '../../shared/utils/type-checking';

const initialState = {
  user: new UserModel({
    userId: "9096358076943957197L"
  }),
  isAuthenticated: false
}

export type UserState = {
  user: IUser,
  isAuthenticated: boolean
}

export const session = {
  state: initialState,
  reducers: {
    setUser: (state: UserState, payload: IUser) => {
      return {
        ...state,
        user: payload,
        isAuthenticated: (isObjectWithFields(payload) && payload.userId)
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async authenticate (passphrase: string) {
      try {

        const { result } = await api.authenticate(passphrase);
        dispatch.session.setUser(result)
      } catch (e) {
        message.error('authentication failed | Dummy profile set')
        dispatch.session.setUser(
          new UserModel({
            userId: "9096358076943957197L"
          })
        )
      }
    },
    logout () {
      dispatch.session.setUser(new UserModel(undefined))
    }
  }),
};
