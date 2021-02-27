//===== React and styles =====
import React, { useCallback, useEffect, useState } from 'react';
import './ProfilePhoto.scss';
import { UpdateUserPhotoThunk } from '../../Redux/Actions/user.action';

//===== Components =====
import FileInput from '../File-input/FileInput';
import Popup from '../Popup/Popup';
import PhotoResizer from '../Photo-resizer/PhotoResizer';

//===== Images =====
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';

//===== Interface =====
interface IProfilePhoto {
  owner: boolean;
}

//===== Main =====
const ProfilePhoto: React.FC<IProfilePhoto> = ({ owner }) => {
  const { user, profile } = useSelector(
    (state: Readonly<RootReducerInterface>) => state
  );

  const dispatch = useDispatch();
  const [photo, setPhoto] = useState<string>();

  const [open, setOpen] = useState<boolean>(false);

  const [newPhoto, setNewPhoto] = useState<boolean>(false);

  const [newPhotoParams, setNewPhotoParams] = useState({
    image: '',
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
  });

  useEffect(() => {
    setPhoto(profile.user_photo);
  }, [profile.user_photo]);

  const updatePhoto = useCallback(
    (img: string) => {
      dispatch(UpdateUserPhotoThunk(user.user_id, img));
    },
    [user.user_id, dispatch]
  );

  const handleImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const image = reader.result as string;
      setNewPhotoParams((prev) => ({
        ...prev,
        image,
      }));
      setNewPhoto(true);
    };
  }, []);

  const handleImgClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div className='profile-photo'>
      <div onClick={handleImgClick} className='profile-photo-img'>
        <img src={photo} alt='User' />
      </div>
      {owner && <FileInput label={'Add photo'} onChange={handleImg} />}
      {open && (
        <Popup height='500' width='500' onClose={handleImgClick}>
          <img src={photo} width='500' height='500' alt='opened user' />
        </Popup>
      )}
      {newPhoto && (
        <PhotoResizer
          photoParams={newPhotoParams}
          setOpen={setNewPhoto}
          setPhoto={setPhoto}
          setPhotoParams={setNewPhotoParams}
          updatePhoto={updatePhoto}
        />
      )}
    </div>
  );
};

export default ProfilePhoto;
