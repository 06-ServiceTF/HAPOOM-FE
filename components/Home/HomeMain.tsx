import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { childrenProps } from '@/types/common';
const MainLayout = styled.main`
  width: 100%;
  height: calc(100vh - 252px);
  overflow-y: auto;
  transform: translateY(-107px);
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (min-width: 768px) {
    height: calc(100vh - 43vh);
    transform: translateY(-215px);
  }
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