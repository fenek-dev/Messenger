import React, { useEffect } from 'react';
import ConversationHeader from '../../Components/ConversationHeader/ConversationHeader';
import './Conversation.scss';

import userPhoto from '../../icons/user.jpg';
import ConvInput from '../../Components/Conv-input/ConvInput';
import Message from '../../Components/Message/Message';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetChatThunk } from '../../Redux/Actions/chats.action';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
const Conversation: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const dispatch = useDispatch();
  const state = useSelector((state: RootReducerInterface) => state);
  //const user = state.user;
  const chat = state.chats.find((chat) => chat.companion_id === id);

  //const [chat, setChat] = useState<IChats>()
  console.log(chat);

  useEffect(() => {
    if (chat) {
      dispatch(GetChatThunk(id));
    }
  }, [dispatch, id, chat]);

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
                    date={message.created_at}
                    type={message.from === id ? 'foreign' : 'own'}
                  />
                );
              })}
          </div>
        </>
      )}
      <ConvInput />
    </section>
  );
};

export default Conversation;
