import React, { memo, useCallback, useEffect } from 'react';
import './Conversation.scss';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetChatThunk } from '../../Redux/Actions/chats.action';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
import { SendMessageThunk } from '../../Redux/Actions/messages.action';

import ConversationHeader from '../../Components/ConversationHeader/ConversationHeader';
import userPhoto from '../../icons/user.jpg';
import ConvInput from '../../Components/Conv-input/ConvInput';
import Message from '../../Components/Message/Message';
import moment from 'moment';
const Conversation: React.FC = () => {
  const params = useParams<{ id: Readonly<string> }>();
  const id = params.id;
  const dispatch = useDispatch();
  const state = useSelector((state: Readonly<RootReducerInterface>) => state);
  const user = state.user;
  const chat = state.chats.find((chat) => chat.companion_id === id);

  useEffect(() => {
    if (chat?.messages.length === 0 && chat.chat_id) {
      dispatch(GetChatThunk(chat.chat_id));
    }
  }, [dispatch, id, chat]);

  const handleSubmit = useCallback(
    (value: Readonly<string>) => {
      if (value === value.trim()) {
        const members = [user.user_id, id];
        dispatch(SendMessageThunk(members, user.user_id, value));
        value = '';
      }
    },
    [dispatch, id, user.user_id]
  );

  return (
    <section className='conversation'>
      {chat && (
        <>
          <ConversationHeader
            name={chat!.companion_name || 'No'}
            photoUrl={userPhoto}
          />

          <div className='conversation-chat'>
            {chat!.messages.length > 0 &&
              chat!.messages.map((message, index) => {
                return (
                  <Message
                    key={index}
                    text={message.body}
                    photoUrl={userPhoto}
                    date={moment(message.created_at).utc().format('hh:mm')}
                    type={message.from === id ? 'foreign' : 'own'}
                  />
                );
              })}
          </div>
          <ConvInput handleSubmit={handleSubmit} />
        </>
      )}
    </section>
  );
};

export default memo(Conversation);
