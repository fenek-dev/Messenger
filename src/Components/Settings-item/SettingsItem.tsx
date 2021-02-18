//===== React and styles =====
import React, { CSSProperties, memo } from 'react';
import './SettingsItem.scss';

//===== Interface =====
interface ISettingsItem {
  readonly styles?: CSSProperties;
  readonly onClick?: any;
  readonly children?: React.ReactNode[];
}

//===== Main =====
const SettingsItem: React.FC<ISettingsItem> = ({
  children,
  styles,
  onClick,
}) => {
  return (
    <div
      data-testid='wrapper'
      style={styles}
      className='settings-item'
      onClick={onClick}>
      {children}
    </div>
  );
};

export default memo(SettingsItem);
