import React from 'react';
import './Message.scss';

export interface IMessageComponent {
  readonly type: 'own' | 'foreign';
  readonly text: string;
  readonly date: string | number;
  readonly photoUrl: string;
}

const Message: React.FC<IMessageComponent> = ({
  text,
  date,
  photoUrl,
  type,
}) => {
  return (
    <div className={type === 'own' ? 'message own' : 'message foreign'}>
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

export default Message;
