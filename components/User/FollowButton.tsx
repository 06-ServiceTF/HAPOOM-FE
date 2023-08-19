import Link from 'next/link';
import { FollowBtn } from '@/styles/user';
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

interface FollowButtonProps {
  currentUserId?: string;
  profileUserId?: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  currentUserId,
  profileUserId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // TODO: API 호출 로직 추가
    // 임시 팔로우 상태 설정
    setIsFollowing(false);
  }, [currentUserId, profileUserId]);

  const handleFollowClick = () => {
    if (isFollowing) {
      setIsModalOpen(true);
    } else {
      setIsFollowing(true);
    }
  };

  const handleConfirmUnfollow = () => {
    setIsFollowing(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {currentUserId === profileUserId ? (
        <FollowBtn $status="설정">
          <Link href="/setting/Setting">설정</Link>
        </FollowBtn>
      ) : (
        <FollowBtn $status={isFollowing ? '팔로잉' : '팔로우'}>
          <button onClick={handleFollowClick}>
            {isFollowing ? '팔로잉' : '팔로우'}
          </button>
        </FollowBtn>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={() => setIsModalOpen(false)}
          actionText="예"
          onClickEvent={handleConfirmUnfollow}
        >
          언팔로우 하시겠습니까?
        </Modal>
      )}
    </>
  );
};

export default FollowButton;
