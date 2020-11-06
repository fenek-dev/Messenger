import { ADD_USER } from "../Constants"

export interface IUserReducerState {
    userId:string,
    name:string
}
const initialState = {
    userId: '',
    name: ''
}

const reducer = (state = initialState, { type, payload }:{type:string, payload:any}) => {
    switch (type) {

        case ADD_USER:
           return {...state, ...payload}

    default:
        return state
    }
}
export default reducer
