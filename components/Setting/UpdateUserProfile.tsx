import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@/components/common/Button';
import { updateUserSetting } from '@/api/user';
import { ProfilePresetList, ProfileItem, ButtonBox } from '@/styles/setting';
import { profilePreset } from '@/public/presetData';
import Modal from '../common/Modal';

type ProfileType = {
  profileImage?: string;
  preset?: number;
};

const UserProfileImageUpdate = ({ profileImage, preset }: ProfileType) => {
  const [selectPreset, setSelectPreset] = useState<number>(preset ? preset : 5);
  const [userProfile, setUserProfile] = useState<string | undefined>(
    profileImage
  );

  const onClickProfileHandler = useCallback((idx: number) => {
    setSelectPreset(idx + 1);
  }, []);
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        alert('업로드되었습니다.');
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const onChangeProfileUpdate = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const imageData = new FormData();

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        setUserProfile(reader.result as string);
      };
      imageData.append('image', file[0]);
      imageData.append('preset', '1');
      await mutate.mutateAsync(imageData);
    }
  };

  const presetMutate = useMutation(
    (formData: FormData) => updateUserSetting(formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userSetting');
      },
    }
  );

  const onSubmitUserProfile = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const presetData = new FormData();

      presetData.append('preset', selectPreset.toString());
      await presetMutate.mutateAsync(presetData);
    },
    [selectPreset, presetMutate]
  );

  return (
    <>
      <form action="" onSubmit={onSubmitUserProfile}>
        <ProfilePresetList>
          <ProfileItem onClick={() => onClickProfileHandler(0)}>
            <figure className={selectPreset === 1 ? 'active' : ''}>
              <Image
                src={userProfile ? userProfile : '/favicon.png'}
                alt="preset"
                width={100}
                height={100}
                quality={100}
              />
            </figure>
          </ProfileItem>
          {profilePreset.map((profile, idx) => {
            return (
              <ProfileItem
                key={idx}
                onClick={() => onClickProfileHandler(idx + 1)}
              >
                <figure className={selectPreset === idx + 2 ? 'active' : ''}>
                  <Image
                    src={profile}
                    alt="preset"
                    width={100}
                    height={100}
                    quality={100}
                  />
                </figure>
              </ProfileItem>
            );
          })}
        </ProfilePresetList>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ButtonBox>
            <label htmlFor="profile" className="profile-button">
              프로필 업로드
            </label>
            <input id="profile" type="file" onChange={onChangeProfileUpdate} />
            <Button $marginTop={'0'} type="submit" className="profile-button">
              프로필 변경
            </Button>
          </ButtonBox>
        </div>
      </form>
    </>
  );
};

export default React.memo(UserProfileImageUpdate);
