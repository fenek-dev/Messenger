import React, { Fragment, memo, useCallback, useEffect } from 'react';
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
import DateBar from '../../Components/Message/DateBar/DateBar';

const Conversation: React.FC = () => {
  const params = useParams<{ id: Readonly<string> }>();
  const id = params.id;
  const dispatch = useDispatch();
  const state = useSelector((state: Readonly<RootReducerInterface>) => state);
  const user = state.user;
  const chat = state.chats.find((chat) => chat.companion_id === id);

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
            {chat!.messages.length > 0 &&
              chat.messages!.map((message, index, arr) => {
                if (arr[index - 1]) {
                  const prevMess = +moment(arr[--index].created_at).format(
                    'DD'
                  );
                  const curnMess = +moment(message.created_at).format('DD');
                  if (curnMess - prevMess !== 0) {
                    return (
                      <Fragment key={index}>
                        <DateBar
                          key={index}
                          date={moment(message.created_at).format('DD MMMM')}
                        />
                        <Message
                          key={message.created_at}
                          text={message.body}
                          photoUrl={userPhoto}
                          date={moment(message.created_at)
                            .utc()
                            .format('hh:mm')}
                          type={message.from === id ? 'foreign' : 'own'}
                        />
                      </Fragment>
                    );
                  }
                }
                return (
                  <Message
                    key={message.created_at}
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
