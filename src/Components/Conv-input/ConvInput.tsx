//===== React and styles =====
import React, { memo, useCallback, useRef } from 'react';
import './ConvInput.scss';

//===== Components =====
import Button from '../Button/Button';

//===== Interface =====
interface IConvInput {
  readonly handleSubmit: (value: string) => void;
}

//===== Main =====
const ConvInput: React.FC<IConvInput> = ({ handleSubmit }) => {
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
  return (
    <form className='conv-input'>
      <input type='text' ref={inputRef} placeholder='Type your message' />
      <Button label='Send' onClick={handleButton} type='button' />
    </form>
  );
};

export default memo(ConvInput);
