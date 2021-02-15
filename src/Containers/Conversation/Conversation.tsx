//================================
// React and Redux
//================================
import React, { memo, useCallback, useEffect, useState } from 'react';
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

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setCoord({ x: e.clientX, y: e.clientY });
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleReply = useCallback(() => {
    setOpen(false);
  }, []);
  const handleEdit = useCallback(() => {
    setOpen(false);
  }, []);
  const handleDelete = useCallback(() => {
    setOpen(false);
  }, []);

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
                    onClick={handleClick}
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
