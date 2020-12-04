//================================
// React and Redux
//================================
import React, { memo } from 'react';
import { IChats } from '../../Redux/Reducers/Reducers';

//===== Components =====
import ListItem from '../ListItem/ListItem';

//===== Utils =====
import moment from 'moment';
import { compressString } from '../../utils/main';

//===== Styles and images =====
import './Chats.scss';
import user from '../../icons/user.jpg';
import search from '../../icons/loupe.svg';

//===== Interface =====
interface IChatsComponent {
  readonly chats: IChats[];
}

//===== Main =====
const Chats: React.FC<IChatsComponent> = ({ chats }) => {
  return (
    <section className='chats'>
      <div className='chats-search'>
        <img src={search} alt='search' className='icon-24' />
        <input
          type='text'
          className='chats-search__input'
          placeholder='Search'
        />
      </div>
      <div className='chats-list'>
        {chats.length > 0 &&
          chats.map((chat) => (
            <ListItem
              key={chat.chat_id}
              companion_id={chat.companion_id}
              name={chat.companion_name}
              photoUrl={user}
              lastMessage={compressString(chat.last_message)}
              date={
                typeof chat.created_at === 'number'
                  ? moment(chat.created_at).utc().format('hh:mm')
                  : chat.created_at
              }
            />
          ))}
      </div>
    </section>
  );
};

export default memo(Chats);
