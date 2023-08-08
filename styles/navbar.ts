import styled from 'styled-components';
import Link from 'next/link';

export const MobileBottomNavLayout = styled.nav`
  position: fixed;
  padding: 8px 24px;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #fff;
  border-top: 1px solid #000;
  z-index: 15;
`;

export const BottomNavList = styled.ul`
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BottomNavItem = styled.li`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconBox = styled(Link)`
  display: block;
  width: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  /* position: relative; */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

//side menu style
export const SideNavLayout = styled.nav`
  position: fixed;
  right: 0;
  width: 30%;
  height: 100vh;
  padding: 0 0 50px 0;
  background-color: #fff;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 70%;
  }
  button {
    cursor: pointer;
  }
`;

export const SideNavMenuList = styled.ul`
  width: 100%;
  border: 1px solid #000;
`;

export const SideNavMenuItem = styled.li`
  width: 100%;
  border: 1px solid #000;
  &.none-padding {
    padding: 0;
  }
  button {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    text-align: start;
  }
  a {
    display: block;
    width: 100%;
    padding: 20px 30px;
  }
`;

export const SubMenuList = styled.ul`
  width: 100%;
  li {
    width: 100%;
    border: 1px solid #000;
  }
`;
