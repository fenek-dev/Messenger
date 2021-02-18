//===== React and styles =====
import React, { memo, useCallback, useEffect, useRef } from 'react';
import './ConvInput.scss';

//===== Components =====
import Button from '../Button/Button';

//===== Utiles =====
import { compressString } from '../../utils/main';
import moment from 'moment';

//===== Interface =====
interface IConvInput {
  readonly handleSubmit: (value: string) => void;
  readonly setReply: any;
  readonly reply?: {
    created_at: number;
    body: string;
    from: string;
    edit: boolean | undefined;
  };
}

//===== Main =====
const ConvInput: React.FC<IConvInput> = ({ handleSubmit, reply, setReply }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reply?.edit) {
      inputRef.current!.value = reply?.body;
    }
  }, [reply]);

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
          {reply.edit && 'Edit: '}
          {compressString(reply.body)}{' '}
          <span>
            {moment(reply.created_at).format('hh:mm  MMM DD ')}{' '}
            <span data-testid='close' className='close' onClick={handleClose}>
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
