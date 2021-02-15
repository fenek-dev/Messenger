//===== React and styles =====
import React, { memo, useCallback, useRef } from 'react';
import './ConvInput.scss';

//===== Components =====
import Button from '../Button/Button';
import { compressString } from '../../utils/main';
import moment from 'moment';

//===== Interface =====
interface IConvInput {
  readonly handleSubmit: (value: string) => void;
  readonly reply: { id: number; text: string } | undefined;
  readonly setReply: any;
}

//===== Main =====
const ConvInput: React.FC<IConvInput> = ({ handleSubmit, reply, setReply }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButton = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      if (inputRef.current!.value !== '') {
        e.preventDefault();
        handleSubmit(inputRef.current!.value);
        inputRef.current!.value = '';
      }
    },
    [handleSubmit]
  );

  const handleChange = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (inputRef.current!.value !== '' && e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(inputRef.current!.value);
        inputRef.current!.value = '';
      }
    },
    [handleSubmit]
  );

  const handleClose = useCallback(() => {
    setReply(undefined);
  }, [setReply]);
  return (
    <form className='conv-input'>
      {reply && (
        <div className='reply'>
          {compressString(reply.text)}{' '}
          <span>
            {moment(reply.id).utc().format('hh:mm  MMM DD ')}{' '}
            <span className='close' onClick={handleClose}>
              &times;
            </span>
          </span>
        </div>
      )}
      <input
        type='text'
        ref={inputRef}
        onKeyDown={handleChange}
        placeholder='Type your message'
      />
      <Button label='Send' onClick={handleButton} type='button' />
    </form>
  );
};

export default memo(ConvInput);
