import { IMessage } from '../Reducers/Reducers';

/**
 * General type for actions
 */
export type IAction<T> = (
  payload: T
) => {
  type: string;
  payload: T;
};

export type IUserPayload = IAddUserAction;
export type IChatsPayload = IAddChatAction & IAddMessageAction;

export type IListOfChats = [
  {
    companion_id: string;
    companion_name: string;
    last_massage: string;
    created_at: string;
  }
];

export type IAddChatAction = {
  companion_id: string;
  companion_name: string;
  last_message: string;
  created_at: string | number;
  messages: IMessage[];
};

export type IAddMessageAction = {
  companion_id: string;
  message: IMessage;
};

export type IAddUserAction = {
  user_id: string;
  name: string;
};
