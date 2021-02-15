//===== Redux =====
import { IChatsPayload } from '../Actions/Actions';
import { IChats } from './Reducers';

//===== Constants =====
import { ADD_CHAT, ADD_MESSAGES } from '../Constants';

const initialState: IChats[] = [];

const reducer = (
  state = initialState,
  { type, payload }: { type: string; payload: IChatsPayload }
) => {
  switch (type) {
    case ADD_CHAT:
      // Find need chat by companion id
      const found_chat = state.find((chat) => payload.chat_id === chat.chat_id);

      if (found_chat) {
        // If chat was found, change the chat with new data
        const changed_chat = {
          ...found_chat,
          last_message: payload.last_message,
          created_at: payload.created_at,
        };
        const chats = state.filter((chat) => chat.chat_id !== payload.chat_id);

        return [...chats, changed_chat];
      }

      // Else return new chat in list
      return [...state, payload];

    case ADD_MESSAGES:
      let changed = false;
      const need_chat = state.find((chat) => chat.chat_id === payload.chat_id);
      if (need_chat)
        need_chat.messages = need_chat?.messages.map((message) => {
          // Take every message and find message with the same created_at property as passed message
          if (message._id === payload.message._id) {
            changed = true;

            // If message was found than change message body by new value from payload
            const newMessage = {
              ...message,
              body: payload.message.body,
            };

            return newMessage;
          } else {
            // If message wasn't found, add new message
            return message;
          }
        });

      if (!changed) need_chat?.messages?.unshift(payload.message);
      if (need_chat) {
        return state.map((chat) =>
          chat.chat_id === payload.chat_id ? need_chat : chat
        );
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default reducer;
