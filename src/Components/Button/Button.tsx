//===== React and styles =====
import React, { memo } from 'react';
import './Button.scss';

//===== Interface =====
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly label: string;
}

//===== Main =====
const Button: React.FC<IButton> = ({ label, type = 'submit', ...props }) => {
  return (
    <button className='button' type={type} {...props}>
      {label}
    </button>
  );
};

export default memo(Button);
