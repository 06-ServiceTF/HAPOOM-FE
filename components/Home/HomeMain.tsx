import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { childrenProps } from '@/types/common';
const MainLayout = styled.main`
  width: 100%;
  height: calc(100vh - 252px);
  height: calc(100dvh - 252px);
  overflow-y: auto;
  transform: translateY(-124px);
  background-color: var(--bg-color);
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (min-width: 768px) {
    height: calc(100vh - 240px);
    height: calc(100dvh - 240px);
    transform: translateY(0);
  }
  /* @media screen and (min-width: 768px) {
    height: auto;
    transform: translateY(0);
  } */
  .center {
    margin: 0 auto;
    max-width: 768px;
    width: 100%;
  }
`;

const Main = ({ children }: childrenProps) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Main;
