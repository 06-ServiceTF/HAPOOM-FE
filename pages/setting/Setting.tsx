import Main from '@/components/Home/Main';
import Header from '@/components/common/Header';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import UpdateNickName from '@/components/Setting/UpdateNickName';
import UpdateUserProfile from '@/components/Setting/UpdateUserProfile';
import UpdatePassword from '@/components/Setting/UpdatePassword';
import Image from 'next/image';
import AccordianMenu from '@/components/common/AccordianMenu';
import Themes from '@/components/Setting/Themes';
import { getUserSetting, updateUserSetting } from '@/api/user';
import { useQuery, useMutation } from 'react-query';

const SettingLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1360px;
  padding: 0 24px;
`;

const AccordianContent = styled.div`
  width: 100%;
  padding-bottom: 36px;
`;

const Setting = () => {
  // const [nickName, setNickName] = useState<string>();
  // const [profileImage, setProfileImage] = useState();
  // const [theme, setTheme] = useState();
  const { data } = useQuery('user', getUserSetting, {
    onSuccess: (data) => {
      // setNickName(data.user.nickname);
      // setProfileImage(data.userImage);
      // setTheme(data.theme);
    },
  });

  return (
    <Main>
      <Header />
      <SettingLayout>
        {data?.user.nickname}
        <AccordianMenu tabText="별명 수정">
          <AccordianContent>
            <UpdateNickName nickname={data?.user.nickname} />
          </AccordianContent>
        </AccordianMenu>
        <AccordianMenu tabText="프로필 수정">
          <AccordianContent>
            <UpdateUserProfile profileImage={data?.user.userImage} />
          </AccordianContent>
        </AccordianMenu>
        <AccordianContent>
          <Themes theme={data?.user.theme} />
        </AccordianContent>
        <AccordianMenu tabText="비밀번호 수정">
          <AccordianContent>
            <UpdatePassword />
          </AccordianContent>
        </AccordianMenu>
      </SettingLayout>
    </Main>
  );
};

export default Setting;
