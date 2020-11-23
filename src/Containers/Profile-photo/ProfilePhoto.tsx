//===== React and styles =====
import React, { useCallback, useEffect, useState } from 'react';
import './ProfilePhoto.scss';

//===== Components =====
import FileInput from '../../Components/File-input/FileInput';

//===== Images =====
import user from '../../icons/user.jpg';

//===== Main =====
const ProfilePhoto: React.FC = () => {
  const [photo, setPhoto] = useState<string>();

  useEffect(() => {
    setPhoto(user);
  }, []);

  const handleImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const img = reader.result as string;
      setPhoto(img);
    };
  }, []);
  return (
    <div className='profile-photo'>
      <div className='profile-photo-img'>
        <img src={photo} alt='User' />
      </div>
      <FileInput label={'Add photo'} onChange={handleImg} />
    </div>
  );
};

export default ProfilePhoto;
