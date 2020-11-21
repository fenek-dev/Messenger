import createSocket from '../../utils/socket';
import { ADD_THEME, ADD_USER } from '../Constants';
import { IAction, IAddUserAction, IThunkAction } from './Actions';

export const AddUserAction: IAction<IAddUserAction> = (payload) => ({
  type: ADD_USER,
  payload,
});

export const AddUserTheme: IAction<{ theme: boolean }> = (payload) => ({
  type: ADD_THEME,
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
      localStorage.setItem('token', JSON.stringify(data.token));
      dispatch(
        AddUserAction({
          user_id: data.userId,
          name,
          socket: createSocket(data.userId),
        })
      );
      dispatch(AddUserTheme({ theme: !!localStorage.getItem('theme') }));
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
      localStorage.setItem('token', JSON.stringify(data.token));
      dispatch(
        AddUserAction({
          user_id: data.userId,
          name: data.name,
          socket: createSocket(data.userId),
        })
      );
      dispatch(AddUserTheme({ theme: !!localStorage.getItem('theme') }));
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
      dispatch(
        AddUserAction({
          user_id: data.userId,
          name: data.name,
          socket: createSocket(data.userId),
        })
      );
      dispatch(AddUserTheme({ theme: !!localStorage.getItem('theme') }));
    }
  } catch (error) {
    console.error(error.message);
  }
};
