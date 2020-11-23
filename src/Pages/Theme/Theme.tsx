//================================
// React and Redux
//================================
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddUserTheme } from '../../Redux/Actions/user.action';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';

//================================
// Components
//================================
import Checkbox from '../../Components/Checkbox/Checkbox';
import SettingsHeader from '../../Components/Settings-header/SettingsHeader';
import SettingsItem from '../../Components/Settings-item/SettingsItem';

//===== Styles =====
import './Theme.scss';

//===== Main =====
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
        styles={{ justifyContent: 'space-between', cursor: 'pointer' }}
        onClick={handleTheme}>
        <h4>Dark theme</h4>
        <Checkbox checked={state.theme} onChange={handleTheme} />
      </SettingsItem>
    </div>
  );
};

export default Theme;
