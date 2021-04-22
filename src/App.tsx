//================================
//  React and Redux
//================================
import React, {useEffect, useState, Suspense} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
import {SignInThunk} from './Redux/Actions/user.action'
import {GetAllChatsThunk} from './Redux/Actions/chats.action'
import {RootReducerInterface} from './Redux/Reducers/Reducers'

//================================
// Components
//================================
import Sidebar from './Containers/Sidebar/Sidebar'
import Conversation from './Containers/Conversation/Conversation'
import Theme from './Pages/Theme/Theme'
import Auth from './Pages/Auth/Auth'
import Profile from './Pages/Profile/Profile'

//===== Main =====
function App() {
  const state = useSelector((state: RootReducerInterface) => state)

  const dispatch = useDispatch()
  const [isAuth, setIsAuth] = useState<boolean>()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')!)
    dispatch(SignInThunk(token, setIsAuth))
  }, [dispatch])

  useEffect(() => {
    dispatch(GetAllChatsThunk(state.user.user_id))
  }, [dispatch, state.user.user_id])

  return (
    <>
      {isAuth ? (
        <div className={`main ${state.theme.theme ? 'dark' : ''}`}>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/">
              <Sidebar title={state.user.name} />
            </Route>
            <Route exact path="/settings/theme">
              <Theme />
            </Route>
            <Route exact path="/profile/:id">
              <Profile />
            </Route>
            <Route exact path="/:id">
              <Conversation />
            </Route>
          </Suspense>
        </div>
      ) : (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/">
              <Auth type="login" setIsAuth={setIsAuth} />
            </Route>
            <Route exact path="/signup">
              <Auth type="register" setIsAuth={setIsAuth} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  )
}

export default App
