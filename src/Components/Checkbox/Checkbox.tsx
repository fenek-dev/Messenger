//===== React and styles =====
import React, { CSSProperties, memo } from 'react';
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
      data-testid='checkbox'
      style={style}
      type='checkbox'
      className='checkbox'
      onChange={onChange}
      checked={checked}
    />
  );
};

export default memo(Checkbox);
