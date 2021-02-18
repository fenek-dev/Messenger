//===== React and styles =====
import React, { memo } from 'react';
import './MenuItem.scss';

//===== Interface =====
interface IMenuItem {
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
}

//===== Main =====
const MenuItem: React.FC<IMenuItem> = ({ onClick, children }) => {
  return (
    <div className='context-menu-item' onClick={onClick}>
      <p>{children}</p>
    </div>
  );
};

export default memo(MenuItem);
