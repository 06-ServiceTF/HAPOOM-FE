import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { HashtagNavBarProps } from '@/types/home';
import {
  HashtagNavBarLayout,
  HashtagList,
  HashtagItem,
  ScrollBar,
  HashtagListContainer,
  HashtagListOther,
  ButtonBox,
  HashtagAll,
} from '@/styles/home';
import { ArrowLong } from '../common/SVG';

const HashtagNavBar: React.FC<HashtagNavBarProps> = ({
  data,
  onClickEvent,
  HashTagScrollTopHandler,
  $isClick,
  setIsClick,
  hashTag,
  setHashTag,
  setTagCategory,
  undefindeTagThumbnail,
  allTagThumbnail,
}) => {
  const [active, setActive] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);
  const otherIndex = data.length + 1;
  const getUniqueHashtags = (arr: any[]) => {
    const seenTags = new Set();
    return arr.filter((item) => {
      if (seenTags.has(item.tag)) {
        return false;
      }
      seenTags.add(item.tag);
      return true;
    });
  };
  const uniqueData = getUniqueHashtags(data);
  const onClickAllTagHandler = () => {
    setHashTag('');
    setTagCategory('모든태그');
    setActive(0);
    HashTagScrollTopHandler();
    setIsClick(true);
  };
  const onClickhashtagHandler = (hashtag: string, index: number) => {
    setHashTag(hashtag);
    setTagCategory('unique');
    setActive(index);
    HashTagScrollTopHandler();
    setIsClick(true);
  };
  const onClickOtherHandler = () => {
    setTagCategory('기타');
    setActive(otherIndex);
    HashTagScrollTopHandler();
    setIsClick(true);
  };
  const onClickHashSlideRightHandler = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
    }
  };
  const onClickHashSlideLeftHandler = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft = 0; // 왼쪽 끝으로 스크롤
    }
  };
  return (
    <HashtagNavBarLayout $isClick={$isClick}>
      <div className="background">
        <ScrollBar onClick={onClickEvent}>
          <span></span>
        </ScrollBar>
        <HashtagListContainer>
          <HashtagListOther>
            <HashtagAll
              onClick={onClickAllTagHandler}
              className={active === 0 ? 'active' : ''}
            >
              <figure>
                <Image
                  src={allTagThumbnail}
                  alt="hashtag thumbnail image"
                  width={100}
                  height={100}
                  loading="eager"
                />
              </figure>
              <figcaption>#모든태그</figcaption>
            </HashtagAll>
            <span className="line"></span>
          </HashtagListOther>
          <HashtagList ref={scrollContainerRef}>
            {uniqueData?.map((hashtag, index) => {
              return (
                <HashtagItem
                  key={index}
                  onClick={() => onClickhashtagHandler(hashtag.tag, index + 1)}
                  className={active === index + 1 ? 'active' : ''}
                >
                  <figure>
                    <Image
                      src={hashtag.image}
                      alt="hashtag thumbnail imagee"
                      width={100}
                      height={100}
                      loading="eager"
                    />
                  </figure>
                  <figcaption>{`#${hashtag.tag}`}</figcaption>
                </HashtagItem>
              );
            })}
            <HashtagItem
              onClick={onClickOtherHandler}
              className={active === otherIndex ? 'active' : ''}
            >
              <figure>
                <Image
                  src={undefindeTagThumbnail}
                  alt="hashtag thumbnail image"
                  width={100}
                  height={100}
                  loading="eager"
                />
              </figure>
              <figcaption>#기타</figcaption>
            </HashtagItem>
          </HashtagList>
          {$isClick ? (
            // <div className="button-wrap">
            <ButtonBox className="hash">
              <button className="left" onClick={onClickHashSlideLeftHandler}>
                <ArrowLong />
              </button>
              <button className="right" onClick={onClickHashSlideRightHandler}>
                <ArrowLong />
              </button>
            </ButtonBox>
          ) : // </div>
          null}
        </HashtagListContainer>
      </div>
    </HashtagNavBarLayout>
  );
};

export default HashtagNavBar;
