import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { getStorageItem } from './API/localstorage.api';
import Sidebar from './Containers/Sidebar/Sidebar';
import Conversation from './Containers/Conversation/Conversation';
import Auth from './Pages/Auth/Auth';
import { SignInThunk } from './Redux/Actions/user.action';

function App() {

  const dispacth = useDispatch()
  const[isAuth, setIsAuth] = useState<boolean>()


  useEffect(()=>{
    dispacth(SignInThunk(getStorageItem('token'), setIsAuth))
  },[dispacth])
  return (
    <>
    {isAuth ? 
    <div className="main">
    <Route path='/'>
    <Sidebar title={'Arthur Moore'}/>  
    <Conversation/>
    </Route>
    </div>
    
    
    :
    <>
    <Route exact path='/'><Auth type='login' setIsAuth={setIsAuth}/></Route>
    <Route exact path='/signup'><Auth type='register' setIsAuth={setIsAuth}/></Route>
    </>
    }
    </>
  );
}

export default App;
