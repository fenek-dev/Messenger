import React, { CSSProperties } from 'react';
import './SettingsItem.scss';

export interface ISettingsItem {
  styles?: CSSProperties;
  onClick?: any;
}

const SettingsItem: React.FC<ISettingsItem> = ({
  children,
  styles,
  onClick,
}) => {
  return (
    <div style={styles} className='settings-item' onClick={onClick}>
      {children}
    </div>
  );
};

export default SettingsItem;
