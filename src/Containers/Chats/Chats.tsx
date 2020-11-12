import React from 'react';
import ListItem from '../../Components/ListItem/ListItem';
import './Chats.scss';
import user from '../../icons/user.jpg';
import search from '../../icons/loupe.svg';
import { IChats } from '../../Redux/Reducers/Reducers';

const Chats: React.FC<{ readonly chats: IChats[] }> = ({ chats }) => {
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
              key={chat.companion_id}
              companion_id={chat.companion_id}
              name={chat.companion_name}
              photoUrl={user}
              lastMessage={chat.last_message || ''}
              date={chat.created_at || ''}
            />
          ))}
      </div>
    </section>
  );
};

export default Chats;
