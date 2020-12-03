//===== React and styles =====
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './ListItem.scss';

//===== Interface =====
interface IListItem {
  readonly name: string;
  readonly companion_id: string;
  readonly photoUrl: string;
  readonly lastMessage: string;
  readonly date: string | number;
  readonly className?: string;
}

//===== Main =====
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
      <div
        data-testid='wrapper'
        className={`list-item ${className && className}`}>
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

export default memo(ListItem);
