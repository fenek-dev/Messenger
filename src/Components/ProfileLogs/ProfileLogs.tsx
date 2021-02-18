//===== React and styles =====
import React from 'react';
import './ProfileLogs.scss';

//===== Utils =====
import moment from 'moment';

//===== Interface =====
interface IProfileLogs {
  name: string;
  online: boolean;
  last_seen: number;
  status: string;
}

//===== Main =====
const ProfileLogs: React.FC<IProfileLogs> = ({
  name,
  online,
  last_seen,
  status,
}) => {
  return (
    <div className='profile_logs'>
      <h5>{name}</h5>
      {status && <p className='status'>Status: {status}</p>}

      <span>
        {online
          ? 'Online'
          : `Last seen: ${moment(last_seen).utc().format('DD MMMM hh:mm')}`}
      </span>
    </div>
  );
};

export default ProfileLogs;
