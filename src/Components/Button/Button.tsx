//===== React and styles =====
import React, { CSSProperties, memo } from 'react';
import './Button.scss';

//===== Interface =====
interface IButton {
  readonly label: string;
  readonly type?: 'button' | 'reset' | 'submit';
  readonly onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
  readonly backgroundColor?: string;
  readonly style?: CSSProperties;
}

//===== Main =====
const Button: React.FC<IButton> = ({
  label,
  type,
  onClick,
  backgroundColor,
  style,
}) => {
  return (
    <button
      style={{ backgroundColor, ...style }}
      className='button'
      type={type ? type : 'submit'}
      onClick={onClick ? onClick : () => {}}>
      {label}
    </button>
  );
};

export default memo(Button);
