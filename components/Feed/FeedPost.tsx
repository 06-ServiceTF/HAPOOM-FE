import Image from 'next/image';
import React from 'react';
import {
  FeedContainer,
  FeedHeader,
  FeedTime,
  FeedIcon,
  FeedUserNickName,
  MainImageContainer,
  LikeIconContainer,
  TagBox,
  FeedTagLikeBox,
} from '../../styles/feed';
import KebabMenuUI, {
  KebabMenuAptionButton,
  KebabMenuStyle,
} from '../common/KebabMenuUI';
import HeartIcon from '../common/HeartIcon';
import ProfileImage from '../common/ProfileImage';
import { useRouter } from 'next/router';
import { Hashtag } from '@/styles/detail';

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
    sessionStorage.setItem('scrollPos', window.scrollY.toString());
    router.push(`/detail/${id}`);
  };

  const moveUserPage = (userId: number) => {
    sessionStorage.setItem('scrollPos', window.scrollY.toString());
    router.push(`/User/${userId}`);
  };
  console.log('feed', feed);

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

        <FeedTagLikeBox justifyContent="flex-start">
          <LikeIconContainer>
            <HeartIcon postId={feed.postId} />
          </LikeIconContainer>
          <TagBox>
            {feed.tags.slice(0, 3).map((tag: string[], index: number) => (
              <Hashtag key={index}>
                <div>{'#' + tag}</div>
              </Hashtag>
            ))}
          </TagBox>
        </FeedTagLikeBox>
      </FeedContainer>
    </>
  );
};

export default React.memo(FeedPost);
