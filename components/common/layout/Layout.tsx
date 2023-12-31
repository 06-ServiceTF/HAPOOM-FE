import React, { ReactNode } from 'react';
import Header from '@/components/common/layout/Header';
import MobileBottomNav from '@/components/common/layout/MobileBottomNav';
import Footer from '@/components/common/Footer';
import AlarmBar from '../AlarmBar';
import { useRouter } from 'next/router';
import { createGlobalStyle, styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { ADD_NOTIFICATION } from '@/redux/reducers/notificationSlice';
import ThemedApp from '../ThemedApp';
import ThemeInitializer from '../ThemeInitializer';
import { ThemeGlobalStyle } from '@/styles/theme';
type layoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProps) => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  return (
    <>
      {/* <GlobalStyle /> */}
      <ThemedApp>
        <ThemeInitializer />
        <ThemeGlobalStyle />
        <LayoutStyle $isHome={isHome}>
          {isHome ? (
            <>{children}</>
          ) : (
            <>
              <Header $sticky={isHome} />
              <LayoutWapper>
                <div className="center">{children}</div>
                {/* <Footer /> */}
              </LayoutWapper>
            </>
          )}
        </LayoutStyle>
      </ThemedApp>
    </>
  );
};

export default Layout;

const LayoutWapper = styled.div`
  width: 100%;
  padding-bottom: 100px;
  /* height: calc(100vh - 70px); */
  /* border-radius: 25px 25px 0 0; */
  /* background-color: #fff; */
  /* overflow: auto; */
  &::-webkit-scrollbar {
    display: none;
  }
`;
type layoutStyleProps = {
  $isHome: boolean;
};
const LayoutStyle = styled.div<layoutStyleProps>`
  /* background-color: ${(props) => (props.$isHome ? '#2797ff' : '#fff')}; */
  .center {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
  }
`;
