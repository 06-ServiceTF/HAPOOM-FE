import React from 'react';
import {
  FollowBox,
  ProfileContentsBox,
  SettingPageLink,
  UserProfileCardBox,
} from '@/styles/user';
import Image from 'next/image';
import { UserData } from './UserUi';
import b1 from '../../public/b1.png';

interface UserProfileCardProps {
  data: UserData | undefined;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ data }) => {
  return (
    <UserProfileCardBox>
      <Image
        src={
          data?.user.userImage && data.user.userImage.startsWith('http')
            ? data.user.userImage
            : b1
        }
        alt={'프로필사진'}
        width={264}
        height={280}
        objectFit={'cover'}
        quality={70}
        loading="eager"
      />
      <ProfileContentsBox>
        <p>{data?.user.nickname}</p>
        <FollowBox>
          <p>팔로워 3</p>
          <p>팔로잉 3</p>
          <SettingPageLink href={'/setting/Setting'}>설정</SettingPageLink>
        </FollowBox>
      </ProfileContentsBox>
    </UserProfileCardBox>
  );
};

export default UserProfileCard;
