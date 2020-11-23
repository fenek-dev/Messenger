//===== React and styles =====
import React, { memo } from 'react';
import './FileInput.scss';

//===== Interface =====
interface IFileInput {
  readonly label: string;
  readonly className?: string;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly accept?: string;
}

//===== Main =====
const FileInput: React.FC<IFileInput> = ({
  label,
  className,
  onChange,
  accept,
}) => {
  return (
    <>
      <label htmlFor='input' className='file-input__label'>
        {label}
      </label>
      <input
        type='file'
        id='input'
        className={`file-input ${className ? className : ''}`}
        onChange={onChange}
        accept={`.jpg, .jpeg, .png  ${accept ? accept : ''}`}
      />
    </>
  );
};

export default memo(FileInput);
