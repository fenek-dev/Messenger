//===== React and styles =====
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './ConversationHeader.scss';

//===== SVG =====
import options from '../../icons/settings.svg';

//===== Interface =====
interface IConversationHeader {
  readonly name: string;
  readonly photoUrl: string;
  readonly id: string;
}

//===== Main =====
const ConversationHeader: React.FC<IConversationHeader> = ({
  name,
  photoUrl,
  id,
}) => {
  return (
    <div className='conv-header'>
      <img src={photoUrl} alt='User' className='icon' />

      <div className='conv-header__content'>
        <Link to={`/profile/${id}`}>
          <div className='conv-header__content-name'>{name}</div>
          <div className='conv-header__content-status'>Online</div>
        </Link>
      </div>
      <div className='conv-header__options'>
        <img src={options} alt='options' className='icon-24' />
      </div>
    </div>
  );
};

export default memo(ConversationHeader);
