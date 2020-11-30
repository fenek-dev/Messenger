//===== React and styles =====
import React, { CSSProperties, memo, useMemo } from 'react';
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
  type = 'submit',
  onClick,
  backgroundColor,
  style,
}) => {
  const styles = useMemo(() => ({ backgroundColor, ...style }), [
    backgroundColor,
    style,
  ]);
  return (
    <button
      style={styles}
      className='button'
      type={type}
      onClick={onClick && onClick}>
      {label}
    </button>
  );
};

export default memo(Button);
