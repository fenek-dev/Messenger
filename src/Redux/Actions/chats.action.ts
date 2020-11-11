import { Dispatch } from 'react';
import io from 'socket.io-client';
import { ADD_CHAT, ADD_MESSAGES } from '../Constants';
import { IGetState, IMessage } from '../Reducers/Reducers';
import {
  IAction,
  IAddChatAction,
  IAddMessageAction,
  IListOfChats,
} from './Actions';

export const AddChatAction: IAction<IAddChatAction> = (payload) => ({
  type: ADD_CHAT,
  payload,
});
export const AddMessageAction: IAction<IAddMessageAction> = (payload) => ({
  type: ADD_MESSAGES,
  payload,
});

export const GetAllChatsThunk = (user_id: string) => async (
  dispatch: Dispatch<any>,
  getState: IGetState
) => {
  if (user_id) {
    const socket = io({
      query: {
        user_id,
      },
    });

    socket.emit('list-of-chats', { user_id });
    socket.on('get:list-of-chats', (data: IListOfChats) => {
      data.forEach((chat) => {
        // const state = getState().chats.find((aChat)=> aChat.companion_id === chat.companion_id && chat.companion_id)
        // ? getState().chats.find((aChat:any)=> aChat.companion_id === chat.companion_id && chat.companion_id)
        // : {last_massage : '',created_at :''}

        dispatch(
          AddChatAction({
            companion_id: chat.companion_id,
            companion_name: chat.companion_name,
            last_message: chat.last_massage,
            created_at: chat.created_at,
            messages: [],
          })
        );
      });
    });
  }
};

export const GetChatThunk = (companion_id: string) => (
  dispatch: any,
  getState: IGetState
) => {
  const id = getState().user.user_id;
  const members = [id, companion_id];

  const socket = io({
    query: {
      user_id: id,
    },
  });

  socket.emit('chat', { members });
  socket.on(
    'get:chat',
    (data: { companion_id: string; messages: IMessage[] }) => {
      data.messages.forEach((message) => {
        console.log(message);

        dispatch(
          AddMessageAction({
            companion_id: data.companion_id,
            message,
          })
        );
      });
    }
  );
};
