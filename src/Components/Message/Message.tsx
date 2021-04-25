//===== React and styles =====
import moment from 'moment'
import React, {memo, useCallback} from 'react'
import './Message.scss'

//===== Interface =====
interface IMessageComponent {
  readonly id: string
  readonly type: 'own' | 'foreign'
  readonly text: string
  readonly date: string | number
  readonly from: string
  readonly reply?: {
    from: string
    body: string
    created_at: number
  }
  readonly onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    date: number,
    text: string,
    from: string,
    id: string,
  ) => void
}

//===== Main =====
const Message: React.FC<IMessageComponent> = ({
  id,
  from,
  text,
  date,
  type,
  reply,
  onClick,
}) => {
  const handleClick = useCallback(
    e => {
      if (typeof date === 'number') {
        onClick(e, date, text, from, id)
      }
    },
    [date, text, onClick, from, id],
  )
  return (
    <div
      data-testid="wrapper"
      className={type === 'own' ? 'message own' : 'message foreign'}>
      <div className="message-content" onClick={handleClick}>
        {reply && (
          <p className="message-content__reply">
            {reply.body}{' '}
            <span>{moment(reply.created_at).format('HH:mm  MMM DD ')}</span>
          </p>
        )}
        <p style={{wordBreak: 'break-word'}} className="message-content__text">
          {text}
        </p>
        <span className="message-content__date">
          {moment(date).format('HH:mm  MMM DD ')}
        </span>
      </div>
    </div>
  )
}

export default memo(Message)
