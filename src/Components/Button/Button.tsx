//===== React and styles =====
import React from 'react';
import './Button.scss';

//===== Interface =====
interface IButton {
  readonly label: string;
  readonly type?: 'button' | 'reset' | 'submit';
  readonly onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
  readonly backgroundColor?: string;
}

//===== Main =====
const Button: React.FC<IButton> = ({
  label,
  type,
  onClick,
  backgroundColor,
}) => {
  return (
    <button
      style={{ backgroundColor }}
      className='button'
      type={type ? type : 'submit'}
      onClick={onClick ? onClick : () => {}}>
      {label}
    </button>
  );
};

export default Button;
