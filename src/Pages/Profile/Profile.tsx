//===== React and stules =====
import React from 'react';
import './Profile.scss';

//===== Components =====
import SettingsHeader from '../../Components/Settings-header/SettingsHeader';
import ProfilePhoto from '../../Containers/Profile-photo/ProfilePhoto';
import ProfileInputs from '../../Containers/Profile-inputs/ProfileInputs';

//===== Main =====
const Profile: React.FC = () => {
  return (
    <>
      <div className='profile'>
        <SettingsHeader title='Profile' />
        <div className='profile-content'>
          <ProfilePhoto />
          <ProfileInputs />
        </div>
      </div>
    </>
  );
};

export default Profile;
