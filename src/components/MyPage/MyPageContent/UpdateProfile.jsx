/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { axiosPostFormData, axiosPut, axiosGet } from '@/features/axios';
import TableBox from '@/components/common/Table/TableBox';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import UserInformationInput from '@/components/common/SignInput/UserInformationInput';
import FileUpload from '@/components/common/FileUpload/FileUpload';
import { AddImg } from '@/../public/images';

export default function UpdateProfile() {
  const [myInfo, setMyInfo] = useState({
    email: '',
    nickname: '',
    profileImageUrl: AddImg,
  });
  const [nextNickname, setNextNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const { email, nickname, profileImageUrl } =
          await axiosGet('/users/me');
        setMyInfo({
          email,
          nickname,
          profileImageUrl,
        });
        setNextNickname(nickname);
      } catch (e) {
        alert('나의 정보를 가져오지 못했습니다.: ', e);
      }
    };
    getMyInfo();
  }, []);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleUpload = async () => {
    try {
      // 닉네임만 변경하는 경우
      if (!selectedImage && nextNickname) {
        try {
          const updatedMyInfo = await axiosPut('users/me', {
            nickname: nextNickname,
            profileImageUrl: myInfo.profileImageUrl,
          });

          if (!updatedMyInfo.status) {
            setMyInfo((prev) => ({
              ...prev,
              nickname: nextNickname,
            }));
          }
        } catch (e) {
          alert('변경에 실패했습니다. 다시 시도해주세요.');
        }
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedImage);

      const res = await axiosPostFormData('users/me/image', formData);

      if (!res.status) {
        try {
          const nextProfileImageUrl = await res.profileImageUrl;
          const updatedMyInfo = await axiosPut('users/me', {
            nickname: nextNickname,
            profileImageUrl: nextProfileImageUrl,
          });

          if (!updatedMyInfo.status) {
            setMyInfo((prev) => ({
              ...prev,
              nickname: nextNickname,
              profileImageUrl: nextProfileImageUrl,
            }));
          }
        } catch (e) {
          alert('변경에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } catch (error) {
      alert('이미지를 업로드하는데 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <TableBox>
      <div className="relative flex flex-col gap-4 md:gap-6">
        <div className="mb-2 text-xl md:text-2xl font-bold">프로필</div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4">
          <FileUpload
            onSelectFile={handleImageSelect}
            imageUrl={myInfo.profileImageUrl}
          />
          <div className="flex flex-col gap-[10px] flex-grow">
            <div>
              <span className="text-base md:text-lg font-medium">이메일</span>
              <UserInformationInput
                placeholder={myInfo.email}
                style={{ outline: 'none', borderColor: '#D9D9D9' }}
                readOnly
              />
            </div>
            <div>
              <span className="text-base md:text-lg font-medium">닉네임</span>
              <UserInformationInput
                value={nextNickname}
                onChange={(e) => setNextNickname(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="relative flex justify-end">
          <CtaDefault onClick={handleUpload} size="xsmall">
            저장
          </CtaDefault>
        </div>
      </div>
    </TableBox>
  );
}
