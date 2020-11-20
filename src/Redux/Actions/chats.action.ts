import { Socket } from 'socket.io-client/build/socket';
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

export const GetAllChatsThunk: IThunkAction = (user_id: string) => async (
  dispatch,
  getState
) => {
  if (user_id) {
    const socket: Socket = await getState().user.socket;

    socket.emit('SERVER:LIST', user_id);
    socket.on('SERVER:LIST', (data: IListOfChats) => {
      data.forEach((chat) => {
        dispatch(
          AddChatAction({
            chat_id: chat.chat_id,
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

export const GetChatThunk: IThunkAction = (
  chat_id: string,
  user_id: string
) => async (dispatch, getState) => {
  const socket = getState().user.socket;

  fetch(`/api/chats/${chat_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id }),
  });

  socket.on(
    'SERVER:CHAT',
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
