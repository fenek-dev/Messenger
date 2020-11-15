import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { storage } from './API/localstorage.api';

import { SignInThunk } from './Redux/Actions/user.action';
import { GetAllChatsThunk } from './Redux/Actions/chats.action';
import { RootReducerInterface } from './Redux/Reducers/Reducers';

const Sidebar = lazy(() => import('./Containers/Sidebar/Sidebar'));
const Conversation = lazy(
  () => import('./Containers/Conversation/Conversation')
);
const Auth = lazy(() => import('./Pages/Auth/Auth'));

function App() {
  const state = useSelector((state: RootReducerInterface) => state.user);

  const dispacth = useDispatch();
  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    const token = storage('token');
    dispacth(SignInThunk(token, setIsAuth));
  }, [dispacth]);
  useEffect(() => {
    dispacth(GetAllChatsThunk(state.user_id));
  }, [dispacth, state.user_id]);

  return (
    <>
      {isAuth ? (
        <div className='main'>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path='/'>
              <Sidebar title={'Arthur Moore'} />
            </Route>
            <Route exact path='/:id'>
              <Conversation />
            </Route>
          </Suspense>
        </div>
      ) : (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path='/'>
              <Auth type='login' setIsAuth={setIsAuth} />
            </Route>
            <Route exact path='/signup'>
              <Auth type='register' setIsAuth={setIsAuth} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
