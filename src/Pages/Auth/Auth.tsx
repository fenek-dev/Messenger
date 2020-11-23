//===== React and Redux =====
import React from 'react';
import {
  CreateUserThunk,
  SignInUserThunk,
} from '../../Redux/Actions/user.action';

//===== Components =====
import AuthForm from '../../Containers/AuthForm/AuthForm';

//===== Interface =====
interface IAuth {
  readonly type: 'register' | 'login';
  setIsAuth: any;
}

//===== Main =====
const Auth: React.FC<IAuth> = ({ type, setIsAuth }) => {
  return (
    <>
      {type === 'login' ? (
        <AuthForm signIn={SignInUserThunk} setIsAuth={setIsAuth} type={type} />
      ) : (
        <AuthForm
          createUser={CreateUserThunk}
          setIsAuth={setIsAuth}
          type={type}
        />
      )}
    </>
  );
};

export default Auth;
