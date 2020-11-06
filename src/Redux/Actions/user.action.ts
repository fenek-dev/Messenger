import { setStorageItem } from "../../API/localstorage.api";
import { ADD_USER } from "../Constants";

export const AddUserAction = (payload:any) => ({
    type: ADD_USER,
    payload
})

export const CreateUserThunk = (email:string, password:string, name:string, setIsAuth:any) => async(dispatch:any) => {
    try {
      if(email && password && name) {
        const body = {email, password, name}
        
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        
        if(!res.ok) {            
            throw new Error(data.message ||'Server error')
        }
        setIsAuth(true)
        setStorageItem('token', data.token)
        dispatch(AddUserAction({userId: data.userId, name}))

    }  
    } catch (error) {
        console.log(error.message)
    }
    
}

export const SignInUserThunk = (email:string, password:string, setIsAuth:any) => async(dispatch:any) => {
    try {
      if(email && password ) {
        const body = {email, password}

        const res = await fetch('/api/auth/login', {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if(!res.ok) {
            throw new Error(data)
        }
        setIsAuth(true)
        setStorageItem('token', data.token)
        dispatch(AddUserAction({userId: data.userId, name: data.name}))

    }  
    } catch (error) {
        console.log(error)
    }
}

export const SignInThunk = (token:string, setIsAuth:any) => async(dispatch:any) => {
    try {
      if(token) {

        const body = {token}
        const res = await fetch('/api/auth/token', {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    
        const data = await res.json()
        if(!res.ok) {
            throw new Error(data)
        }
        setIsAuth(true)
        dispatch(AddUserAction({userId: data.userId, name: data.name}))

    }  
    } catch (error) {
        console.log(error)
    }
}