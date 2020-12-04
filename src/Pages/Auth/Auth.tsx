//===== React and Redux =====
import React, { memo, useCallback } from 'react';
import {
  CreateUserThunk,
  SignInUserThunk,
} from '../../Redux/Actions/user.action';

//===== Components =====
import AuthForm from '../../Components/AuthForm/AuthForm';
import { useDispatch } from 'react-redux';

//===== Interface =====
interface IAuth {
  readonly type: 'register' | 'login';
  setIsAuth: (...params: any) => void;
}

//===== Main =====
const Auth: React.FC<IAuth> = ({ type, setIsAuth }) => {
  const dispatch = useDispatch();

  const signIn = useCallback(
    (values: { email: string; password: string }) => {
      dispatch(SignInUserThunk(values.email, values.password, setIsAuth));
    },
    [dispatch, setIsAuth]
  );

  const createUser = useCallback(
    (values: { email: string; password: string; name: string }) => {
      dispatch(
        CreateUserThunk(values.email, values.password, values.name, setIsAuth)
      );
    },
    [dispatch, setIsAuth]
  );
  return (
    <>
      {type === 'login' ? (
        <AuthForm signIn={signIn} type={type} />
      ) : (
        <AuthForm createUser={createUser} type={type} />
      )}
    </>
  );
};

export default memo(Auth);
