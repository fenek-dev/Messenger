import React, { memo } from 'react';
import SettingsListItem from './Settings-list-item/SettingsListItem';
import './SettingsList.scss';
const SettingsList = () => {
  return (
    <section className='settings'>
      <div className='settings-list'>
        <div className='settings-list-header'>
          <h3 className='settings-list-header__title'>Settings</h3>
        </div>
        <div className='settings-list-account'>
          <h4 className='settings-list__label'>Account</h4>
          <SettingsListItem text='Edit profile' link='/profile' />
          <SettingsListItem text='Confidentiality' link='/conf' />
        </div>
        <div className='settings-list-options'>
          <h4 className='settings-list__label'>Options</h4>
          <SettingsListItem text='Notification' link='/notif' />
          <SettingsListItem text='Theme' link='/theme' />
        </div>
      </div>
    </section>
  );
};

export default memo(SettingsList);
