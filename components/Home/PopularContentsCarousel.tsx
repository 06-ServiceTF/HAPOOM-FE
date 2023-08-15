import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { SectionTitle } from '@/styles/home';
import ImageContent from './ImageContent';

const CARDS = 10;
const MAX_VISIBILITY = 3;
const Images = ['/c1.jpeg', '/c2.jpeg', '/c3.jpeg', '/c4.jpeg', '/c5.jpeg'];

interface CarouselProps {
  children: React.ReactNode;
  active: number;
  setActive: any;
}

const Carousel: React.FC<CarouselProps> = ({ children, active, setActive }) => {
  return (
    <CarouselStyle>
      {React.Children.map(children, (child, idx) => (
        <CardContainer
          key={idx}
          active={active}
          i={idx}
          className={active === idx ? '' : 'inactive'}
        >
          {child}
        </CardContainer>
      ))}
    </CarouselStyle>
  );
};

const PopularContentsCarousel = () => {
  const [active, setActive] = useState<number>(0);
  const isMouseDown = useRef<boolean>(false);
  const offsetX = useRef<number>(0);

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const dragDistance = endX !== null && startX !== null ? endX - startX : 0;

  const calculateDragDistance = useCallback(() => {
    if (dragDistance > 0) {
      setActive(active <= 0 ? 0 : active - 1);
    } else if (dragDistance < 0) {
      setActive(active >= Images.length - 1 ? Images.length - 1 : active + 1);
     }
  }, [startX, endX, dragDistance, active]); // 의존성 배열에 active와 Images 추가

  //마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = true;
    offsetX.current = e.clientX;
    setStartX(e.clientX); // 시작 위치를 저장합니다.
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;  
    setEndX(e.clientX);
    calculateDragDistance(); 
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    setEndX(e.clientX); // 현재 위치를 저장합니다.
  };


// 터치 이벤트 

const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  isMouseDown.current = true;
  offsetX.current = e.touches[0].clientX;
  setStartX(e.touches[0].clientX); // 시작 위치를 저장합니다.
};

// touchmove 이벤트 처리
const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  if (!isMouseDown.current) return;
  setEndX(e.touches[0].clientX); // 현재 위치를 저장합니다.
};

// touchend 이벤트 처리
const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
  if (!isMouseDown.current) return;
  isMouseDown.current = false;
  setEndX(e.changedTouches[0].clientX);
  calculateDragDistance();
};




  return (
    <>
    <SectionTitle>#오늘의 좋아요</SectionTitle>

    <PopularContentsSection
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Carousel active={active} setActive={setActive}>
        {Images.map((item, idx) => (
          <ImageContent key={idx} src={item} alt={'image'} postId={idx}/>
          // <Image
          //   src={item}
          //   alt="img"
          //   key={idx}
          //   width={100}
          //   height={100}
          //   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          // />
        ))}
      </Carousel>
    </PopularContentsSection>
    </>
  );
};


const PopularContentsSection = styled.section`
width: 100%;
height: 50vh;
padding:36px 24px;
display: flex;
justify-content: center;
overflow: hidden;
`

const CarouselStyle = styled.div`
  position: relative;
  width: 50%;
  /* padding-bottom: 50%; */
  height: 65%;
  perspective: 500px;
  transform-style: preserve-3d;

`;

type props = {
  active: number;
  i: number;
};

const CardContainer = styled.div<props>`
  position: absolute;
  width: 100%;
  /* height: 100%; */
  border-radius: 8px;
  overflow: hidden;
  pointer-events: auto;
  --active: ${({ active, i }) => (i === active ? 1 : 0)};
  --offset: ${({ active, i }) => (active - i) / 3};
  --direction: ${({ active, i }) => active - i};
  --abs-offset: ${({ active, i }) => Math.abs(active - i) / 3};
  opacity: ${({ active, i }) =>
    Math.abs(active - i) / 3 >= MAX_VISIBILITY ? 0 : 1};
  display: ${({ active, i }) =>
    Math.abs(active - i) / 3 > MAX_VISIBILITY ? 'none' : 'block'};
  transform: rotateY(calc(0 * 50deg)) scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -30rem))
    translateX(calc(var(--direction) * -8rem));
  transition: all 0.3s ease-out;
  &.inactive {
    pointer-events: none;
  }
`;


export default PopularContentsCarousel;