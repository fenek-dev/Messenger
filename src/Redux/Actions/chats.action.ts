import io from 'socket.io-client';
import { ADD_CHAT, ADD_MESSAGES } from '../Constants';
import { IMessage } from '../Reducers/Reducers';
import {
  IAction,
  IAddChatAction,
  IAddMessageAction,
  IListOfChats,
  IThunkAction,
} from './Actions';

export const AddChatAction: IAction<IAddChatAction> = (payload) => ({
  type: ADD_CHAT,
  payload,
});
export const AddMessageAction: IAction<IAddMessageAction> = (payload) => ({
  type: ADD_MESSAGES,
  payload,
});

export const CreateChatThunk: IThunkAction = (
  members: string[]
) => async () => {
  try {
    const res = await fetch('/api/chats/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(members),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const GetAllChatsThunk: IThunkAction = (user_id: string) => (
  dispatch
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

export const GetChatThunk: IThunkAction = (companion_id: string) => (
  dispatch,
  getState
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
