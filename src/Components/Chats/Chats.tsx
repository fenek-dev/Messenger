//================================
// React and Redux
//================================
import React, { ChangeEvent, memo, useCallback, useState } from 'react';
import { IChats } from '../../Redux/Reducers/Reducers';

//===== Components =====
import ListItem from '../ListItem/ListItem';

//===== Utils =====
import moment from 'moment';
import { compressString, debounce } from '../../utils/main';

//===== Styles and images =====
import './Chats.scss';
import user from '../../icons/user.jpg';
import search from '../../icons/loupe.svg';
import Search from '../../Containers/Search/Search';

//===== Interface =====
interface IChatsComponent {
  readonly chats: IChats[];
}

//===== Main =====
const Chats: React.FC<IChatsComponent> = ({ chats }) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const handleFocus = useCallback(() => {
    setIsSearching(true);
  }, []);

  const handleBlur = () => {
    setIsSearching(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(setInputValue(e.target.value), 400);
  };
  return (
    <section className='chats'>
      <div className='chats-search'>
        <img src={search} alt='search' className='icon-24' />
        <input
          type='text'
          className='chats-search__input'
          placeholder='Search'
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {isSearching && (
          <p className='chats-search__close' onClick={handleBlur}>
            &times;
          </p>
        )}
      </div>
      <div className='chats-list'>
        {isSearching ? (
          <Search value={inputValue} />
        ) : (
          chats.length > 0 &&
          chats.map((chat) => (
            <ListItem
              key={chat.chat_id}
              companion_id={chat.companion_id}
              name={chat.companion_name}
              photoUrl={chat.companion_photo || user}
              lastMessage={compressString(chat.last_message)}
              date={
                typeof chat.created_at === 'number'
                  ? moment(chat.created_at).format('HH:mm')
                  : chat.created_at
              }
            />
          ))
        )}
      </div>
    </section>
  );
};

export default memo(Chats);
