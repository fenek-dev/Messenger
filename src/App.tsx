import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { getStorageItem } from './API/localstorage.api';
import Sidebar from './Containers/Sidebar/Sidebar';
import Conversation from './Containers/Conversation/Conversation';
import Auth from './Pages/Auth/Auth';
import { SignInThunk } from './Redux/Actions/user.action';
import { GetAllChatsThunk } from './Redux/Actions/chats.action';
import { RootReducerInterface } from './Redux/Reducers/Reducers';

function App() {
  const state = useSelector((state: RootReducerInterface) => state.user);

  const dispacth = useDispatch();
  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    dispacth(SignInThunk(getStorageItem('token'), setIsAuth));
  }, [dispacth]);
  useEffect(() => {
    dispacth(GetAllChatsThunk(state.user_id));
  }, [dispacth, state.user_id]);

  return (
    <>
      {isAuth ? (
        <div className='main'>
          <Route path='/'>
            <Sidebar title={'Arthur Moore'} />
          </Route>
          <Route path='/:id'>
            <Conversation />
          </Route>
        </div>
      ) : (
        <>
          <Route exact path='/'>
            <Auth type='login' setIsAuth={setIsAuth} />
          </Route>
          <Route exact path='/signup'>
            <Auth type='register' setIsAuth={setIsAuth} />
          </Route>
        </>
      )}
    </>
  );
}

export default App;
