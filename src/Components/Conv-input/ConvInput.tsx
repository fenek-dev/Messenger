import React, { memo, useCallback, useRef } from 'react';
import './ConvInput.scss';

export interface IConvInput {
  readonly handleSubmit: (value: string) => void;
}
const ConvInput: React.FC<IConvInput> = ({ handleSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButton = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleSubmit(inputRef.current!.value);
      inputRef.current!.value = '';
    },
    [handleSubmit]
  );
  return (
    <form className='conv-input'>
      <input type='text' ref={inputRef} placeholder='Type your message' />
      <button type='submit' onClick={handleButton} className='conv-input-btn'>
        Send
      </button>
    </form>
  );
};

export default memo(ConvInput);
