//===== React and styles =====
import React, { memo } from 'react';
import './Checkbox.scss';

//===== Interface =====
interface ICheckbox extends React.InputHTMLAttributes<HTMLInputElement> {}

//===== Main =====
const Checkbox: React.FC<ICheckbox> = ({ ...props }) => {
  return (
    <input
      data-testid='checkbox'
      type='checkbox'
      className='checkbox'
      {...props}
    />
  );
};

export default memo(Checkbox);
