//===== Redux =====
import { IThunkAction } from './Actions';
import { CreateChatThunk } from './chats.action';

export const SendMessageThunk: IThunkAction = (
  members: string[],
  from: string,
  body: string
) => async (dispatch, getState) => {
  try {
    const companion_id = members.find((member) => member !== from);
    if (!getState().chats.find((chat) => chat.companion_id === companion_id)) {
      dispatch(CreateChatThunk(members));
    }
    const message = { members, from, body, created_at: new Date().getTime() };
    const res = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const SendReplyThunk: IThunkAction = (
  members: string[],
  from: string,
  body: string,
  reply: {
    from: string;
    text: string;
    id: number;
  }
) => async () => {
  try {
    const message = {
      members,
      from,
      body,
      created_at: new Date().getTime(),
      reply,
    };
    const res = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const UpdateMesssageThunk: IThunkAction = (
  chat_id: string,
  message_id: string,
  body: string
) => async () => {
  try {
    const message = { message_id, body, chat_id };

    const res = await fetch('/api/message/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const DeleteMessageThunk: IThunkAction = (
  user_id: string,
  created_at: number
) => async () => {
  try {
    const message = { user_id, created_at };
    const res = await fetch('/api/message/create', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};
