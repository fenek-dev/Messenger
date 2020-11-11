import React from 'react';
import { Link } from 'react-router-dom';
import './ListItem.scss';

export interface IListItem {
  name: string;
  companion_id: string;
  photoUrl: string;
  lastMessage: string;
  date: string | number;
  className?: string;
}

const ListItem: React.FC<IListItem> = ({
  name,
  companion_id,
  photoUrl,
  lastMessage,
  date,
  className,
}) => {
  return (
    <Link style={{ display: 'block' }} to={`/${companion_id}`}>
      <div className={`list-item ${className && className}`}>
        <img src={photoUrl} alt='avatar' className='list-item__avatar icon' />
        <div className='list-item__content'>
          <h5 className='list-item__content-name'>{name}</h5>
          <p className='list-item__content-last-message'>{lastMessage}</p>
        </div>

        <span className='list-item__date'>{date}</span>
      </div>
    </Link>
  );
};

export default ListItem;
