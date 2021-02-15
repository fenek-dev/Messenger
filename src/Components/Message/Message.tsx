//===== React and styles =====
import React, { memo, useCallback } from 'react';
import './Message.scss';

//===== Interface =====
interface IMessageComponent {
  readonly id: number | string;
  readonly type: 'own' | 'foreign';
  readonly text: string;
  readonly date: string | number;
  readonly from: string;
  readonly photoUrl: string;
  readonly onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
    text: string,
    from: string
  ) => void;
}

//===== Main =====
const Message: React.FC<IMessageComponent> = ({
  id,
  from,
  text,
  date,
  photoUrl,
  type,
  onClick,
}) => {
  const handleClick = useCallback(
    (e) => {
      if (typeof id === 'number') {
        onClick(e, id, text, from);
      }
    },
    [id, text, onClick, from]
  );
  return (
    <div
      data-testid='wrapper'
      className={type === 'own' ? 'message own' : 'message foreign'}>
      <img src={photoUrl} alt='User' className='icon' />
      <div className='message-content' onClick={handleClick}>
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
