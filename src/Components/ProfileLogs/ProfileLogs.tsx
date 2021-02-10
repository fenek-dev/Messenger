import React from 'react';
import moment from 'moment';
import './ProfileLogs.scss';
interface IProfileLogs {
  name: string;
  online: boolean;
  last_seen: number;
}

const ProfileLogs: React.FC<IProfileLogs> = ({ name, online, last_seen }) => {
  return (
    <div className='profile_logs'>
      <h5>{name}</h5>
      <span>
        {online
          ? 'Online'
          : `Last seen: ${moment(last_seen).utc().format('DD MMMM hh:mm')}`}
      </span>
    </div>
  );
};

export default ProfileLogs;
