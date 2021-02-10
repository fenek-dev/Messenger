import { Dispatch } from 'react';
import { IMessage, RootReducerInterface } from '../Reducers/Reducers';

/**
 * General type for actions
 */
export type IAction<T = any> = (
  payload: readonly T
) => {
  readonly type: string;
  readonly payload?: T;
};

export type IUserPayload = Readonly<IAddUserAction>;
export type IChatsPayload = Readonly<IAddChatAction & IAddMessageAction>;
export type IListOfChats = [
  {
    readonly chat_id: string;
    readonly companion_id: string;
    readonly companion_name: string;
    readonly last_massage: string;
    readonly created_at: string;
  }
];

export type IAddChatAction = {
  readonly chat_id: string;
  readonly companion_id: string;
  readonly companion_name: string;
  readonly last_message: string;
  readonly created_at: string | number;
  readonly messages: IMessage[];
};

export type IAddMessageAction = {
  readonly companion_id: string;
  readonly message: IMessage;
  readonly chat_id: string;
};

export interface IAddUserAction {
  readonly user_id?: string;
  readonly name: string;
  readonly status?: string;
  readonly socket?: any;
}

export type IThunkAction = (
  ...params: readonly any
) => (
  dispatch: readonly Dispatch<any>,
  getState: () => RootReducerInterface
) => void;
