import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AddUserTheme } from '../../Redux/Actions/user.action';
import SettingsListItem from './Settings-list-item/SettingsListItem';
import './SettingsList.scss';
const SettingsList: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(AddUserTheme({ theme: 'dark' }));
  }, [dispatch]);
  return (
    <section className='settings'>
      <div className='settings-list'>
        <div className='settings-list-header'>
          <h3 className='settings-list-header__title'>Settings</h3>
        </div>
        <div className='settings-list-account'>
          <h4 className='settings-list__label'>Account</h4>
          <SettingsListItem text='Edit profile' link='/profile' />
          <SettingsListItem text='Confidentiality' link='/confidentiality' />
        </div>
        <div className='settings-list-options'>
          <h4 className='settings-list__label'>Options</h4>
          <SettingsListItem text='Notification' link='/notification' />
          <SettingsListItem onClick={handleClick} text='Theme' link='/theme' />
        </div>
      </div>
    </section>
  );
};

export default memo(SettingsList);
