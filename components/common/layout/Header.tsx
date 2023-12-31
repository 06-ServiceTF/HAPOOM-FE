import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import SideNav from '../SideNav';
import Link from 'next/link';
import {
  HeaderLayout,
  LogoBox,
  SearchInputBox,
  IconBox,
  AccountActionsContainer,
  GoWriteLink,
  ProfileButton,
  AuthButtonBox,
  MobileBox,
} from '@/styles/header';
import useInput from '@/hooks/useInput';
import IconButton from '../IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { userLogOut } from '@/api/user';
import {
  LOGOUT_USER,
  TOGGLE_PUSH,
  UserState,
} from '@/redux/reducers/userSlice';
import { SearchIcon, Bell, EditIcon, Cloud } from '@/components/common/SVG';
import { setCookie } from 'nookies';
import ProfileImage from '@/components/common/ProfileImage';
import { RootState } from '@/redux/config/configStore';
import Modal from '../Modal';

const ENDPOINT = `${process.env.NEXT_PUBLIC_LOCAL_SERVER}`;

const Header = ({ $sticky, ...restProps }: any) => {
  const { user }: { user: UserState['user'] } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const isTrend = router.pathname === '/';
  const isFeed = router.pathname === '/feed';
  const isSearch = router.pathname === '/search';
  const isWrite = router.pathname === '/post/Write';
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const BellColor = () => {
    if (isTrend) {
      return $sticky ? 'var(--header-nav-active-color)' : '#fff';
    } else {
      return 'var(--header-nav-active-color)';
    }
  };

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMessge, setModalMessge] = useState<any>({
    actionText: '',
    modalMessge: '',
    onClickEvent: '',
  });
  const onClickShowMenuHandler = () => {
    router.push(`/User/${user.email}`);
  };

  const handleLogoClick = () => {
    router.push('/');
  };
  const LoginHandler = () => {
    setModalMessge({
      actionText: '확인',
      modalMessge: '로그인이 필요한 서비스입니다. 로그인 하시겠습니까?',
      onClickEvent: () => router.push('/auth/SignIn'),
    });
    setIsOpen(!isOpen);
  };
  const goToWritePage = () => {
    setCookie(null, 'update', '1', { path: '/' });
    setCookie(null, 'updateId', '0', { path: '/' });
    router.push('/post/Write'); // 글쓰기 페이지로 이동
  };

  useEffect(() => {
    if (user.email !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [user.email]);

  // Notification permission 요청
  function requestNotificationPermission() {
    // Check if the window object is defined to ensure running on client side
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          subscribeUserToPush(); // 권한이 허용되면 Push Subscription 생성
        } else {
          // console.error('Notification permission denied.');
        }
      });
    }
  }

  function checkNotificationPermission() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        // 권한 요청이 아직 안된 상태
        requestNotificationPermission();
      }
    }
  }

  // Push Subscription 생성
  async function subscribeUserToPush() {
    const registration = await navigator.serviceWorker.ready;

    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    };

    const pushSubscription = await registration.pushManager.subscribe(
      subscribeOptions
    );

    // 서버에 Push Subscription 저장
    await fetch(`${ENDPOINT}/api/util/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pushSubscription),
      credentials: 'include',
    });
  }

  // 예시로, 앱이 로드될 때 알림 권한 요청
  useEffect(() => {
    if (user.email !== null) requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (user.email !== null) subscribeUserToPush();
  }, [user.email]);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const clickBell = async () => {
    await fetch(`${ENDPOINT}/api/util/togglepush`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    dispatch(TOGGLE_PUSH());
  };

  return (
    <>
      <HeaderLayout $sticky={$sticky} {...restProps}>
        <div className="center">
          <LogoBox href={'/'} onClick={handleLogoClick} $sticky={$sticky}>
            <h1>HAPOOM</h1>
          </LogoBox>
          <AccountActionsContainer>
            <Link
              href={'/search'}
              className={isSearch ? 'active search' : ' search'}
            >
              검색
            </Link>
            |
            <button
              onClick={!token ? LoginHandler : goToWritePage}
              className={isWrite ? 'active edit' : ' edit'}
            >
              글쓰기
            </button>
            |
            <Link href={'/'} className={isTrend ? 'active' : ''}>
              트렌드
            </Link>
            |
            <Link href={'/feed'} className={isFeed ? 'active' : ''}>
              피드
            </Link>
            |
            {!token ? (
              <>
                {/* <AuthButtonBox> */}
                <Link href={'/auth/SignIn'}>로그인</Link>|
                <Link href={'/auth/SignUp'}>회원가입</Link>
                {/* </AuthButtonBox> */}
                <ProfileButton
                  onClick={LoginHandler}
                  $sticky={$sticky}
                  aria-label="go profile page"
                >
                  <Cloud />
                </ProfileButton>
              </>
            ) : (
              <>
                <IconButton
                  onClick={clickBell}
                  $noneEdge={true}
                  aria-label="alarm on off"
                >
                  <Bell fillColor={BellColor()} $isPush={user?.push} />
                </IconButton>
                <ProfileButton
                  onClick={onClickShowMenuHandler}
                  $sticky={$sticky}
                >
                  <ProfileImage
                    preset={user?.preset || 5}
                    userImage={user?.userImage || ''}
                    loading="eager"
                  />
                </ProfileButton>
              </>
            )}
          </AccountActionsContainer>
          <MobileBox>
            <IconButton onClick={clickBell} aria-label="alarm on off">
              <Bell fillColor={BellColor()} $isPush={user?.push} />
            </IconButton>
          </MobileBox>
        </div>
      </HeaderLayout>
      {isShowMenu && (
        <SideNav setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu} />
      )}
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

export default Header;
