import React, { memo } from 'react';
import './Menu.scss';

interface IMenu {
  readonly coord: { x: number; y: number };
  readonly children: React.ReactNode;
  readonly visible: boolean;
  readonly onClose?: () => void;
}

const Menu: React.FC<IMenu> = ({ children, coord, visible, onClose }) => {
  return (
    <div
      className='overlay'
      style={{ display: visible ? 'block' : 'none' }}
      onClick={onClose}>
      <div className='context-menu' style={{ top: coord.y, left: coord.x }}>
        {children}
      </div>
    </div>
  );
};

export default memo(Menu);
