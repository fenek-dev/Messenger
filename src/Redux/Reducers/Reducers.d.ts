// Root Reducer
export interface RootReducerInterface {
  user: IUserReducerState;
  chats: IChats[];
}

export type IGetState = () => RootReducerInterface;

// User Eeducer
export interface IUserReducerState {
  user_id: string;
  name: string;
}

// Chats Reducer
export type IMessage = {
  from: string;
  body: string;
  created_at: string | number;
  received: boolean;
};
export type IChats = {
  companion_id: string;
  companion_name: string;
  last_message: string;
  created_at: string | number;
  messages: IMessage[];
};
