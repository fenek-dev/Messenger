//================================
// React and Redux
//================================
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetChatThunk } from '../../Redux/Actions/chats.action';
import { IChats, RootReducerInterface } from '../../Redux/Reducers/Reducers';
import { SendMessageThunk } from '../../Redux/Actions/messages.action';

//================================
// Components
//================================
import ConversationHeader from '../../Components/Conversation-header/ConversationHeader';
import ConvInput from '../../Components/Conv-input/ConvInput';
import Message from '../../Components/Message/Message';

//===== Utils =====
import moment from 'moment';

//===== Styles and images =====
import './Conversation.scss';
import userPhoto from '../../icons/user.jpg';

//===== Main =====
const Conversation: React.FC = () => {
  // Get id from search params
  const params = useParams<{ id: Readonly<string> }>();
  const id = params.id;

  const dispatch = useDispatch();

  const [chat, setChat] = useState<IChats>();
  //===== States =====
  const state = useSelector((state: Readonly<RootReducerInterface>) => state);
  const user = state.user;

  useEffect(() => {
    const need = state.chats.find((chat) => chat.companion_id === id);
    setChat(need);
  }, [id, state.chats]);

  // Get all chats from server
  useEffect(() => {
    if (chat?.messages.length === 0) {
      dispatch(GetChatThunk(chat.chat_id, user.user_id));
    }
  }, [dispatch, id, chat, user.user_id]);

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
            {
              // If messages is existing
              chat.messages.map((message) => {
                return (
                  <Message
                    key={message.created_at}
                    text={message.body}
                    photoUrl={userPhoto}
                    date={moment(message.created_at)
                      .utc()
                      .format('hh:mm  MMM DD ')}
                    type={message.from === id ? 'foreign' : 'own'}
                  />
                );
              })
            }
          </div>
          <ConvInput handleSubmit={handleSubmit} />
        </>
      )}
    </section>
  );
};

export default memo(Conversation);
