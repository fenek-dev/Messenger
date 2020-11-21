import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsHeader from '../../Components/Settings-header/SettingsHeader';
import SettingsItem from '../../Components/Settings-item/SettingsItem';
import { AddUserTheme } from '../../Redux/Actions/user.action';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
import './Theme.scss';

const Theme: React.FC = () => {
  const state = useSelector((state: RootReducerInterface) => state.user);
  const dispatch = useDispatch();

  const handleTheme = useCallback(() => {
    dispatch(AddUserTheme({ theme: !state.theme }));
    localStorage.setItem('theme', JSON.stringify(!state.theme));
  }, [dispatch, state.theme]);
  return (
    <div className='theme'>
      <SettingsHeader title='Theme settings' />
      <SettingsItem
        styles={{ justifyContent: 'space-between' }}
        onClick={handleTheme}>
        <h4>Dark theme</h4>
        <input
          style={{ marginRight: '30px', transform: 'scale(1.5)' }}
          type='checkbox'
          checked={state.theme ? true : false}
          onChange={() => {}}
        />
      </SettingsItem>
    </div>
  );
};

export default Theme;
