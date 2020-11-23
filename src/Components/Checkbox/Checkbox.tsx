//===== React and styles =====
import React, { CSSProperties } from 'react';
import './Checkbox.scss';

//===== Interface =====
interface ICheckbox {
  readonly style?: CSSProperties;
  readonly onChange?: () => void;
  readonly checked?: boolean;
}

//===== Main =====
const Checkbox: React.FC<ICheckbox> = ({ style, onChange, checked }) => {
  return (
    <input
      style={style}
      type='checkbox'
      className='checkbox'
      onChange={onChange}
      checked={checked}
    />
  );
};

export default Checkbox;
