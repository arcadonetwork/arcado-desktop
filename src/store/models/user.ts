import UserModel, { IUser } from '../../models/user.model';
import { Dispatch } from '../store';
import { message } from 'antd';
import api from '../../shared/services/api';

const initialState = new UserModel({
  userId: "9096358076943957197L"
})

export type UserState = IUser

export const user = {
  state: initialState,
  reducers: {
    setUser: (state: UserState, payload: IUser) => {
      return payload
    },
  },
  effects: (dispatch: Dispatch) => ({
    async authenticate (passphrase: string) {
      try {
        const { result } = await api.authenticate(passphrase);
        if (result) {
          const user = new UserModel(result);
          dispatch({ type: 'user/setUser', payload: user })
        }
      } catch (e) {
        message.error('authentication failed | Dummy profile set')
        const user = new UserModel({
        userId: "9096358076943957197L"
      });
      dispatch({ type: 'user/setUser', payload: user })
      }
    },
  }),
};
