//===== React and styles =====
import React, { memo } from 'react';
import './Message.scss';

//===== Interface =====
interface IMessageComponent {
  readonly type: 'own' | 'foreign';
  readonly text: string;
  readonly date: string | number;
  readonly photoUrl: string;
}

//===== Main =====
const Message: React.FC<IMessageComponent> = ({
  text,
  date,
  photoUrl,
  type,
}) => {
  return (
    <div
      data-testid='wrapper'
      className={type === 'own' ? 'message own' : 'message foreign'}>
      <img src={photoUrl} alt='User' className='icon' />
      <div className='message-content'>
        <p
          style={{ wordBreak: 'break-word' }}
          className='message-content__text'>
          {text}
        </p>
        <span className='message-content__date'>{date}</span>
      </div>
    </div>
  );
};

export default memo(Message);
