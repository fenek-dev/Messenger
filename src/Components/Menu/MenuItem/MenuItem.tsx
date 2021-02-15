import React, { memo } from 'react';
import './MenuItem.scss';

interface IMenuItem {
  onClick?: () => void;
  children: React.ReactNode;
}

const MenuItem: React.FC<IMenuItem> = ({ onClick, children }) => {
  return (
    <div className='context-menu-item' onClick={onClick}>
      <p>{children}</p>
    </div>
  );
};

export default memo(MenuItem);
