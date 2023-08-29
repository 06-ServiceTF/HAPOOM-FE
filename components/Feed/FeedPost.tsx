import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  FeedContainer,
  FeedHeader,
  FeedMusicLikeBox,
  FeedTime,
  FeedIcon,
  FeedUserNickName,
  MainImageContainer,
  LikeIconContainer,
  FeedContent,
  MoreButton,
  FeedContentBox,
  TagBox,
} from '../../styles/feed';
import KebabMenuUI, {
  KebabMenuAptionButton,
  KebabMenuStyle,
} from '../common/KebabMenuUI';
import HeartIcon from '../common/HeartIcon';
import ProfileImage from '../common/ProfileImage';
import { useRouter } from 'next/router';
import { TagStyle } from '../Write/Tag';

interface FeedItemProps {
  feed: any;
  handleReportClick: (id: any) => void;
  toggleExpanded: (postId: number) => void;
  isExpanded: boolean;
}
const timeSince = (date: string) => {
  const now: Date = new Date();
  const inputDate: Date = new Date(date);
  const seconds: number = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + '일 전';
  } else if (hours > 0) {
    return hours + '시간 전';
  } else if (minutes > 0) {
    return minutes + '분 전';
  } else {
    return '방금 전';
  }
};
const FeedPost = ({
  feed,
  handleReportClick,
  toggleExpanded,
  isExpanded,
}: FeedItemProps) => {
  const router = useRouter();
  const content =
    isExpanded || feed.content.length <= 30
      ? feed.content
      : `${feed.content.slice(0, 30)}...`;
  const moveDetailPage = (id: number) => {
    router.push(`/detail/${id}`);
  };
  const moveUserPage = (userId: number) => {
    router.push(`/User/${userId}`);
  };
  return (
    <>
      <FeedContainer key={feed.postId}>
        <FeedHeader>
          <div onClick={() => moveUserPage(feed.userId)}>
            <ProfileImage userImage={feed.userImage} preset={feed.preset} />
          </div>
          <FeedUserNickName onClick={() => moveUserPage(feed.userId)}>
            {feed.nickname}
          </FeedUserNickName>
          <FeedTime>{timeSince(feed.updatedAt)}</FeedTime>
          <FeedIcon>
            <KebabMenuUI>
              <KebabMenuStyle>
                {feed.postId && (
                  <KebabMenuAptionButton
                    onClick={() => handleReportClick(feed.postId)}
                  >
                    신고하기 <span></span>
                  </KebabMenuAptionButton>
                )}
              </KebabMenuStyle>
            </KebabMenuUI>
          </FeedIcon>
        </FeedHeader>

        <MainImageContainer>
          <Image
            src={feed.image}
            alt={'Feed Image'}
            width={272}
            height={188}
            quality={100}
            priority
            onClick={() => moveDetailPage(feed.postId)}
          />
        </MainImageContainer>

        <FeedMusicLikeBox>
          <TagBox>
            {feed.tags.slice(0, 3).map((tag: string[], index: number) => (
              <TagStyle key={index}>
                <div>{tag}</div>
              </TagStyle>
            ))}
          </TagBox>
          {/* <MusicBox>
            <FeedPlayer />
            <div>{feed.musicTitle}</div>
          </MusicBox> */}
          <LikeIconContainer>
            <HeartIcon postId={feed.postId} />
          </LikeIconContainer>
        </FeedMusicLikeBox>
        <FeedContentBox>
          <FeedContent>{content}</FeedContent>
          {feed.content.length > 30 && (
            <MoreButton onClick={() => toggleExpanded(feed.postId)}>
              {isExpanded ? null : '더보기'}
            </MoreButton>
          )}
        </FeedContentBox>
      </FeedContainer>
    </>
  );
};

export default React.memo(FeedPost);