import {
  Email,
  FollowButtonStyled,
  FollowContainer,
  Nickname,
  TabButton,
  TabContainer,
  TabUnderline,
  UserInfo,
  UserList,
  UserListItemStyled,
  UserProfileImage,
} from '@/styles/followTab';

import React, { useState } from 'react';

interface User {
  userId: number;
  email: string;
  nickname: string;
  userImage: string;
}

interface FollowTabProps {
  followers: User[];
  followings: User[];
}

interface TabUnderlineProps {
  $activeTab: 'followers' | 'followings';
}

const UserListItem: React.FC<User> = ({ userImage, nickname, email }) => {
  return (
    <UserListItemStyled>
      <UserProfileImage src={userImage} alt={nickname} />
      <UserInfo>
        <Nickname>{nickname}</Nickname>
        <Email>{email}</Email>
      </UserInfo>
      <FollowButtonStyled>팔로잉</FollowButtonStyled>
    </UserListItemStyled>
  );
};

const mockFollowers: User[] = [
  {
    userId: 1,
    email: 'follower1@example.com',
    nickname: '되냐?',
    userImage: 'path_to_image1',
  },
  {
    userId: 2,
    email: 'follower2@example.com',
    nickname: '팔로우했냐?',
    userImage: 'path_to_image2',
  },
  {
    userId: 3,
    email: 'follower3@example.com',
    nickname: '팔로잉은했냐?',
    userImage: 'path_to_image3',
  },
  {
    userId: 4,
    email: 'follower4@example.com',
    nickname: '사진은찍었냐',
    userImage: 'path_to_image4',
  },
];

const mockFollowings: User[] = [
  {
    userId: 5,
    email: 'following1@example.com',
    nickname: '팔로잉이동외않되?',
    userImage: 'path_to_image2',
  },
  {
    userId: 6,
    email: 'following1@example.com',
    nickname: '해줘이동',
    userImage: 'path_to_image2',
  },
  {
    userId: 7,
    email: 'following1@example.com',
    nickname: '돼라',
    userImage: 'path_to_image2',
  },
  {
    userId: 8,
    email: 'following1@example.com',
    nickname: '응안돼돌아가',
    userImage: 'path_to_image2',
  },
];

const FollowTab: React.FC<FollowTabProps> = ({ followers, followings }) => {
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );

  const handleTabClick = (tab: 'followers' | 'followings') => {
    setActiveTab(tab);
  };

  return (
    <FollowContainer>
      <TabContainer>
        <TabButton onClick={() => handleTabClick('followers')}>
          팔로워
        </TabButton>
        <TabButton onClick={() => handleTabClick('followings')}>
          팔로잉
        </TabButton>
        <TabUnderline $activeTab={activeTab} />
      </TabContainer>

      <UserList>
        {activeTab === 'followers' &&
          mockFollowers.map((user) => (
            <UserListItem key={user.userId} {...user} />
          ))}
        {activeTab === 'followings' &&
          mockFollowings.map((user) => (
            <UserListItem key={user.userId} {...user} />
          ))}
      </UserList>
    </FollowContainer>
  );
};

export default FollowTab;
