import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { likePost } from '@/api/post';
import { LikeCloud } from './SVG';
import { UserState } from '@/redux/reducers/userSlice';
import { RootState } from '@/redux/config/configStore';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import { useRouter } from 'next/router';
type iconType = {
  $isLike: boolean;
};

const HeartIconBox = styled.div<iconType>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$isLike ? `#0084FF` : `#538cc080`)};
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  svg {
    transform: translate(-1px, -1px);
  }
  &:hover {
    background-color: #0084ff90;
  }
`;

type Props = {
  postId: number | string;
};

const HeartIcon = ({ postId }: Props) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<any>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const router = useRouter();
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const mutation = useMutation((postId: string) => likePost(postId));
  const modalHandler = () => {
    router.push('/auth/SignIn');
  };
  const onClickHeartHandler = (
    postId: number | string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (user.email === null) {
      setModalMessge({
        actionText: '확인',
        modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
        onClickEvent: modalHandler,
      });
      setIsOpen(!isOpen);
    } else {
      setIsLike(!isLike);
      mutation.mutate(postId.toString());
    }
  };
  return (
    <>
      <HeartIconBox
        onClick={(event) => onClickHeartHandler(postId, event)}
        $isLike={isLike}
        className="heart"
      >
        <LikeCloud />
      </HeartIconBox>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actionText={modalMessge.actionText}
        onClickEvent={modalMessge.onClickEvent}
      >
        로그인 후 이용할 수 있는 서비스 입니다.
        <br /> 로그인 하시겠습니까?
      </Modal>
    </>
  );
};

export default HeartIcon;
