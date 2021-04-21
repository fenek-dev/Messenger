//===== Redux =====;
import { IMessage } from '../Reducers/Reducers';
import {
  IAction,
  IAddChatAction,
  IAddMessageAction,
  IListOfChats,
  IThunkAction,
} from './Actions';

//===== Constants =====
import { ADD_CHAT, ADD_MESSAGES } from '../Constants';

//===== Socket =====
import { Socket } from 'socket.io-client/build/socket';

export const AddChatAction: IAction<IAddChatAction> = (payload) => ({
  type: ADD_CHAT,
  payload,
});
export const AddMessageAction: IAction<IAddMessageAction> = (payload) => ({
  type: ADD_MESSAGES,
  payload,
});

export const CreateChatThunk: IThunkAction = (members: string[]) => async (
  dispatch
) => {
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
            companion_last_seen: chat.companion_last_seen,
            companion_photo: chat.companion_photo,
            last_message: chat.last_massage,
            created_at: chat.created_at,
            messages: [],
          })
        );
      });
    });
    socket.on(
      'SERVER:CHAT',
      (data: { messages: IMessage[]; chat_id: string }) => {
        console.log('data: ', data);

        data.messages.forEach((message) => {
          dispatch(
            AddMessageAction({
              chat_id: data.chat_id,
              message,
            })
          );
        });
      }
    );
  }
};

export const GetChatThunk: IThunkAction = (
  chat_id: string,
  user_id: string
) => async (dispatch, getState) => {
  const res = await fetch(`/api/chats/${chat_id}/${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  data.messages.forEach((message: any) => {
    dispatch(
      AddMessageAction({
        chat_id: data.chat_id,
        message,
      })
    );
  });
};
