//===== React and stules =====
import React, { useCallback } from 'react';
import './Profile.scss';

//===== Components =====
import SettingsHeader from '../../Components/Settings-header/SettingsHeader';
import ProfilePhoto from '../../Components/Profile-photo/ProfilePhoto';
import ProfileInputs from '../../Containers/Profile-inputs/ProfileInputs';
import { useDispatch } from 'react-redux';
import {
  AddUserAction,
  UpdateUserInfoThunk,
} from '../../Redux/Actions/user.action';

//===== Main =====
const Profile: React.FC = () => {
  const dispatch = useDispatch();

  const updateUser = useCallback(
    ({ name, status }: { name: string; status: string }) => {
      dispatch(UpdateUserInfoThunk({ name, status }));
    },
    [dispatch]
  );

  const addUser = useCallback(
    ({ name, status }: { name: string; status: string }) => {
      dispatch(AddUserAction({ name, status }));
    },
    [dispatch]
  );

  return (
    <>
      <div className='profile'>
        <SettingsHeader title='Profile' />
        <div className='profile-content'>
          <ProfilePhoto />
          <ProfileInputs updateUser={updateUser} addUser={addUser} />
        </div>
      </div>
    </>
  );
};

export default Profile;
