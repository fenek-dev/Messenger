//===== React and styles =====
import React, { memo } from 'react';
import './SettingsList.scss';

//===== Components =====
import SettingsListItem from './Settings-list-item/SettingsListItem';

//===== Interface =====
interface ISettingsList {
  readonly userId: string;
}

//===== Main =====
const SettingsList: React.FC<ISettingsList> = ({ userId }) => {
  return (
    <section className='settings'>
      <div className='settings-list'>
        <div className='settings-list-header'>
          <h3 className='settings-list-header__title'>Settings</h3>
        </div>
        <div className='settings-list-account'>
          <h4 className='settings-list__label'>Account</h4>
          <SettingsListItem text='Edit profile' link={`/profile/${userId}`} />
          <SettingsListItem text='Confidentiality' link='/confidentiality' />
        </div>
        <div className='settings-list-options'>
          <h4 className='settings-list__label'>Options</h4>
          <SettingsListItem text='Notification' link='/notification' />
          <SettingsListItem text='Theme' link='/settings/theme' />
        </div>
      </div>
    </section>
  );
};

export default memo(SettingsList);
