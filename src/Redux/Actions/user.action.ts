import { storage } from '../../API/localstorage.api';
import { ADD_USER } from '../Constants';
import { IAction, IAddUserAction, IThunkAction } from './Actions';

export const AddUserAction: IAction<IAddUserAction> = (payload) => ({
  type: ADD_USER,
  payload,
});

export const CreateUserThunk: IThunkAction = (
  email: string,
  password: string,
  name: string,
  setIsAuth: (value: boolean) => void
) => async (dispatch) => {
  try {
    if (email && password && name) {
      const body = { email, password, name };

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Server error');
      }
      setIsAuth(true);
      storage('token', data.token);
      dispatch(AddUserAction({ user_id: data.userId, name }));
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const SignInUserThunk: IThunkAction = (
  email: string,
  password: string,
  setIsAuth: (value: boolean) => void
) => async (dispatch) => {
  try {
    if (email && password) {
      const body = { email, password };

      const res = await fetch('/api/auth/login', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setIsAuth(true);
      storage('token', data.token);
      dispatch(AddUserAction({ user_id: data.userId, name: data.name }));
    }
  } catch (error) {
    console.error(error);
  }
};

export const SignInThunk: IThunkAction = (
  token: string,
  setIsAuth: (value: boolean) => void
) => async (dispatch) => {
  try {
    if (token) {
      const body = { token };
      const res = await fetch('/api/auth/token', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setIsAuth(true);
      dispatch(AddUserAction({ user_id: data.userId, name: data.name }));
    }
  } catch (error) {
    console.error(error.message);
  }
};
