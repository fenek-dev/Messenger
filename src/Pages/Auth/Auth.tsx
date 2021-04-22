//===== React and Redux =====
import React, {memo, useCallback, useState} from 'react'
import {CreateUserThunk, SignInUserThunk} from '../../Redux/Actions/user.action'
import {useDispatch} from 'react-redux'

//===== Components =====
import AuthForm from '../../Components/AuthForm/AuthForm'
import Popup from '../../Components/Popup/Popup'

//===== Interface =====
interface IAuth {
  readonly type: 'register' | 'login'
  setIsAuth: (...params: any) => void
}

//===== Main =====
const Auth: React.FC<IAuth> = ({type, setIsAuth}) => {
  const dispatch = useDispatch()

  const [error, setError] = useState<string>()
  const signIn = useCallback(
    (values: {email: string; password: string}) => {
      dispatch(
        SignInUserThunk(values.email, values.password, setIsAuth, setError),
      )
    },
    [dispatch, setIsAuth],
  )

  const createUser = useCallback(
    (values: {email: string; password: string; name: string}) => {
      dispatch(
        CreateUserThunk(
          values.email,
          values.password,
          values.name,
          setIsAuth,
          setError,
        ),
      )
    },
    [dispatch, setIsAuth],
  )

  const cleanError = useCallback(() => {
    setError(undefined)
  }, [])
  return (
    <>
      {type === 'login' ? (
        <AuthForm signIn={signIn} type={type} />
      ) : (
        <AuthForm createUser={createUser} type={type} />
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
    </>
  )
}

export default memo(Auth)
