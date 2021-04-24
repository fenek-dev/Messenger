//================================
//  React and Redux
//================================
import React, {useEffect, useState, Suspense, lazy, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
import {SignInThunk} from './Redux/Actions/user.action'
import {GetAllChatsThunk} from './Redux/Actions/chats.action'
import {RootReducerInterface} from './Redux/Reducers/Reducers'

//================================
// Components
//================================
import Auth from './Pages/Auth/Auth'
import Popup from './Components/Popup/Popup'
const Sidebar = lazy(() => import('./Containers/Sidebar/Sidebar'))
const Conversation = lazy(
  () => import('./Containers/Conversation/Conversation'),
)
const Theme = lazy(() => import('./Pages/Theme/Theme'))
const Profile = lazy(() => import('./Pages/Profile/Profile'))

//===== Main =====
function App() {
  const state = useSelector((state: RootReducerInterface) => state)

  const dispatch = useDispatch()
  const [isAuth, setIsAuth] = useState<boolean>()
  const [error, setError] = useState<string | undefined>()

  const cleanError = useCallback(() => {
    setError(undefined)
  }, [])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')!)
    dispatch(SignInThunk(token, setIsAuth, setError))
  }, [dispatch])

  useEffect(() => {
    dispatch(GetAllChatsThunk(state.user.user_id))
  }, [dispatch, state.user.user_id])

  return (
    <div className={`main ${state.theme.theme ? 'dark' : ''}`}>
      {isAuth ? (
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
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/">
            <Auth type="login" setIsAuth={setIsAuth} />
          </Route>
          <Route exact path="/signup">
            <Auth type="register" setIsAuth={setIsAuth} />
          </Route>
        </Suspense>
      )}
      {error && (
        <Popup
          width="200px"
          height="auto"
          onClose={cleanError}
          title="Error"
          text={error}
        />
      )}
    </div>
  )
}

export default App
