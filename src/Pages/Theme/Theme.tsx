//================================
// React and Redux
//================================
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
import { AddThemeAction } from '../../Redux/Actions/theme.action';

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
  const state = useSelector((state: RootReducerInterface) => state.theme);
  const dispatch = useDispatch();

  const handleTheme = useCallback(() => {
    dispatch(AddThemeAction({ theme: state.theme === 'dark' ? null : 'dark' }));
    localStorage.setItem(
      'theme',
      JSON.stringify(state.theme === 'dark' ? null : 'dark')
    );
  }, [dispatch, state.theme]);

  return (
    <div className='theme'>
      <SettingsHeader title='Theme settings' />
      <SettingsItem
        style={{ justifyContent: 'space-between', cursor: 'pointer' }}
        onClick={handleTheme}>
        <h4>Dark theme</h4>
        <Checkbox checked={state.theme === 'dark'} onChange={handleTheme} />
      </SettingsItem>
    </div>
  );
};

export default Theme;
