import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProfileBox } from '@/styles/setting';
import { profilePreset } from '@/public/presetData';

type ProfileProps = {
  userImage?: string;
  preset?: number;
  nick?: string;
  email?: string;
  direction?: 'column' | 'row';
};

const Profile = ({
  userImage,
  preset,
  nick,
  email,
  direction,
}: ProfileProps) => {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [nickname, setNickname] = useState<string>('nick');

  useEffect(() => {
    if (preset === 1) {
      setProfileImage(userImage);
    } else {
      const foundPreset = profilePreset.find(
        (presetElement, idx) => idx + 2 === preset
      );
      setProfileImage(foundPreset);
    }
  }, [preset]);

  useEffect(() => {
    setNickname(nick || '');
  }, [nick]);

  return (
    <ProfileBox direction={direction}>
      <div className="image">
        {profileImage && (
          <Image
            src={profileImage}
            alt={'image'}
            width={74}
            height={74}
            priority
          />
        )}
      </div>
      <div>
        <h2>{nickname}</h2>
        <span></span>
        <p style={{ fontSize: '12px' }}>{email}</p>
      </div>
    </ProfileBox>
  );
};
export default React.memo(Profile);
