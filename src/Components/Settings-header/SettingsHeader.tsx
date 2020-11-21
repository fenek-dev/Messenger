import React from 'react';
import './SettingsHeader.scss';
export interface ISettingsHeader {
  title: string;
}

const SettingsHeader: React.FC<ISettingsHeader> = ({ title }) => {
  return (
    <div className='settings-header'>
      <h4 className='settings-header__title'>{title}</h4>
    </div>
  );
};

export default SettingsHeader;
