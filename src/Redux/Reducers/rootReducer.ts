// Redux
import { applyMiddleware, combineReducers } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

import userReducer, { IUserReducerState } from './user.reducer'

export interface RootReducerInterface {
    user: IUserReducerState
}

const rootReducer = combineReducers<RootReducerInterface>({
    user: userReducer
  });
  
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;