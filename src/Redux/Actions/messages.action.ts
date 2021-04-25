//===== Redux =====
import {IThunkAction} from './Actions'
import {CreateChatThunk} from './chats.action'

export const SendMessageThunk: IThunkAction = (
  members: string[],
  from: string,
  body: string,
) => async (dispatch, getState) => {
  try {
    const companion_id = members.find(member => member !== from)
    const chat = getState().chats.find(
      chat => chat.companion_id === companion_id,
    )
    if (!chat) {
      dispatch(CreateChatThunk(members))
    }
    const message = {
      chat_id: chat?.chat_id,
      from,
      body,
      created_at: new Date().getTime(),
    }
    const res = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const SendReplyThunk: IThunkAction = (
  members: string[],
  from: string,
  body: string,
  reply: {
    from: string
    text: string
    id: number
  },
) => async (dispatch, getState) => {
  try {
    const companion_id = members.find(member => member !== from)
    const chat = getState().chats.find(
      chat => chat.companion_id === companion_id,
    )

    const message = {
      chat_id: chat?.chat_id,
      from,
      body,
      created_at: new Date().getTime(),
      reply,
    }

    const res = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const UpdateMessageThunk: IThunkAction = (
  chat_id: string,
  message_id: string,
  body: string,
) => async () => {
  try {
    const message = {message_id, body, chat_id}

    const res = await fetch('/api/message/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message)
    }
  } catch (error) {
    console.error(error.message)
  }
}
