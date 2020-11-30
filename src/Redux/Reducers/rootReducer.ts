//================================
// Redux
//================================
import { applyMiddleware, combineReducers } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { RootReducerInterface } from './Reducers';

//================================
// Reducers
//================================
import chatsReducer from './chats.reducer';
import userReducer from './user.reducer';
import themeReducer from './theme.reducer';

const rootReducer = combineReducers<RootReducerInterface>({
  user: userReducer,
  chats: chatsReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
