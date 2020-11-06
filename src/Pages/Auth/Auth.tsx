import React from 'react'
import AuthForm from '../../Containers/AuthForm/AuthForm'
import { CreateUserThunk, SignInUserThunk } from '../../Redux/Actions/user.action'

export interface IAuth {
    type: 'register' | 'login'
    setIsAuth: any
}

const Auth:React.FC<IAuth> = ({type,setIsAuth}) => {    
    return (
        <>
        {type === 'login' ?
        <AuthForm signIn={SignInUserThunk} setIsAuth={setIsAuth} type={type} />
        : 
        <AuthForm createUser={CreateUserThunk} setIsAuth={setIsAuth} type={type} /> 
        }
        </>
    )
}

export default Auth
