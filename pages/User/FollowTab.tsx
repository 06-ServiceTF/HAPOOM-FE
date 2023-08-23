import { getFollowers, getFollowings } from '@/api/user';
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
import React, { useState, useEffect } from 'react';

// 사용자 정보 타입
interface User {
  userId: number;
  email: string;
  nickname: string;
  userImage: string;
}

interface FollowTabProps {
  userId: string;
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

const FollowTab: React.FC<FollowTabProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<'followers' | 'followings'>(
    'followers'
  );
  const [followers, setFollowers] = useState<User[]>([]);
  const [followings, setFollowings] = useState<User[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const result = await getFollowers(userId);
        setFollowers(result);
      } catch (error) {
        console.error('Failed to fetch followers:', error);
      }
    };

    const fetchFollowings = async () => {
      try {
        const result = await getFollowings(userId);
        setFollowings(result);
      } catch (error) {
        console.error('Failed to fetch followings:', error);
      }
    };

    fetchFollowers();
    fetchFollowings();
  }, [userId]);

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
          (Array.isArray(followers)
            ? followers.map((user) => (
                <UserListItem key={user.userId} {...user} />
              ))
            : null)}

        {activeTab === 'followings' &&
          (Array.isArray(followings)
            ? followings.map((user) => (
                <UserListItem key={user.userId} {...user} />
              ))
            : null)}
      </UserList>
    </FollowContainer>
  );
};

export default FollowTab;
