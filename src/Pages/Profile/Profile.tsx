//===== React and Redux =====
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddUserAction,
  UpdateUserInfoThunk,
} from '../../Redux/Actions/user.action';
import { Link, useParams } from 'react-router-dom';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
import { GetProfileThunk } from '../../Redux/Actions/profile.action';
import { CreateChatThunk } from '../../Redux/Actions/chats.action';

//===== Styles =====
import './Profile.scss';

//===== Components =====
import SettingsHeader from '../../Components/Settings-header/SettingsHeader';
import ProfilePhoto from '../../Components/Profile-photo/ProfilePhoto';
import ProfileInputs from '../../Containers/Profile-inputs/ProfileInputs';
import ProfileLogs from '../../Components/ProfileLogs/ProfileLogs';
import Button from '../../Components/Button/Button';

//===== Main =====
const Profile: React.FC = () => {
  const { user, profile, chats } = useSelector(
    (state: Readonly<RootReducerInterface>) => state
  );
  const dispatch = useDispatch();

  const [owner, setOwner] = useState<boolean>(false);
  const { id } = useParams<{ id: Readonly<string> }>();
  useEffect(() => {
    if (id === user.user_id) {
      setOwner(true);
    } else {
      setOwner(false);
      dispatch(GetProfileThunk(id));
    }
  }, [id, user.user_id, dispatch]);

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

  const createChat = useCallback(() => {
    if (!chats.find((chat) => chat.companion_id === id)) {
      dispatch(CreateChatThunk([user.user_id, id]));
    }
  }, [chats, dispatch, id, user.user_id]);
  return (
    <>
      <div className='profile'>
        <SettingsHeader title='Profile' />
        <div className='profile-content'>
          <ProfilePhoto owner={owner} />
          {owner ? (
            <ProfileInputs updateUser={updateUser} addUser={addUser} />
          ) : (
            <>
              <ProfileLogs
                name={profile.user_name}
                last_seen={profile.user_logs.last_seen}
                online={profile.user_logs.online}
                status={profile.user_status}
              />
              <Link to={`/${id}`}>
                <Button label='Type' onClick={createChat} />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
