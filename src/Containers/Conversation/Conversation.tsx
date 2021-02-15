//================================
// React and Redux
//================================
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetChatThunk } from '../../Redux/Actions/chats.action';
import { IChats, RootReducerInterface } from '../../Redux/Reducers/Reducers';
import {
  SendMessageThunk,
  SendReplyThunk,
  UpdateMesssageThunk,
} from '../../Redux/Actions/messages.action';

//================================
// Components
//================================
import ConversationHeader from '../../Components/Conversation-header/ConversationHeader';
import ConvInput from '../../Components/Conv-input/ConvInput';
import Message from '../../Components/Message/Message';

//===== Styles and images =====
import './Conversation.scss';
import userPhoto from '../../icons/user.jpg';
import Menu from '../../Components/Menu/Menu';
import MenuItem from '../../Components/Menu/MenuItem/MenuItem';

//===== Main =====
const Conversation: React.FC = () => {
  // Get id from search params
  const params = useParams<{ id: Readonly<string> }>();
  const id = params.id;

  const dispatch = useDispatch();

  const [chat, setChat] = useState<IChats>();

  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [open, setOpen] = useState<boolean>(false);

  const [message, setMessage] = useState<{
    created_at: number;
    body: string;
    from: string;
    id: string;
  }>({
    created_at: 0,
    body: '',
    from: '',
    id: '',
  });
  const [reply, setReply] = useState<{
    created_at: number;
    body: string;
    from: string;
    edit: boolean;
    id: string;
  }>();

  const state = useSelector((state: Readonly<RootReducerInterface>) => state);
  const user = state.user;

  useEffect(() => {
    // console.log(state.chats.find((chat) => chat.companion_id === id)?.messages);

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
        if (reply && !reply.edit) {
          dispatch(SendReplyThunk(members, user.user_id, value, reply));
          value = '';
          setReply(undefined);
        } else if (reply && reply.edit) {
          dispatch(UpdateMesssageThunk(chat?.chat_id, reply.id, value));
          setReply(undefined);
          value = '';
        } else {
          dispatch(SendMessageThunk(members, user.user_id, value));
          value = '';
        }
      }
    },
    [dispatch, id, user.user_id, reply, chat?.chat_id]
  );

  const handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      created_at: number,
      body: string,
      from: string,
      id: string
    ) => {
      setCoord({ x: e.clientX, y: e.clientY });
      setOpen(true);
      setMessage({ created_at, body, from, id });
    },
    []
  );
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleReply = useCallback(() => {
    setReply({ ...message, edit: false });
  }, [message]);
  const handleEdit = useCallback(() => {
    setReply({ ...message, edit: true });
  }, [message]);
  const handleDelete = useCallback(() => {}, []);

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
                    id={message._id}
                    onClick={handleClick}
                    key={message.created_at}
                    text={message.body}
                    reply={message.reply}
                    photoUrl={userPhoto}
                    date={message.created_at}
                    from={message.from}
                    type={message.from === id ? 'foreign' : 'own'}
                  />
                );
              })
            }
          </div>
          <ConvInput
            reply={reply}
            handleSubmit={handleSubmit}
            setReply={setReply}
          />
        </>
      )}
      {open && (
        <Menu coord={coord} visible={open} onClose={handleClose}>
          <MenuItem onClick={handleReply}>Reply</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      )}
    </section>
  );
};

export default memo(Conversation);
