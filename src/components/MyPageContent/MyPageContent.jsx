import { useState, useRef } from 'react';
import Image from 'next/image';
import { axiosPostMultipartFormData } from '@/features/axios';
import TableBox from '@/components/Table/TableBox';
import { AddButtonFill, PaginationArrow } from '../../../public/images';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import UserInformationInput from '@/components/SignInput/UserInformationInput';

export default function MyPageContent() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert('Please select a file.');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      const res = await axiosPostMultipartFormData('users/me/image', formData);
      // const res = await axiosPost('users/me/image', formData);
      if (res.status === 201) {
        console.log('성공');
        const profileImageUrl = await res.json();
        console.log('profileImageUrl:', profileImageUrl);
        console.log(res.data);
        alert('Image uploaded successfully!');
        return profileImageUrl;
      }
      if (res.status === 401) {
        console.log('Error uploading image: ');
        return;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      return null;
    }
  };

  return (
    <div className="flex flex-col justify-start gap-3 py-[17px] px-3 md:p-5 bg-gray_FAFAFA flex-grow">
      <div className="flex items-center mb-[13px] gap-[6px] ">
        <span className="relative w-5 h-5">
          <Image
            fill
            className="scale-x-[-1]"
            src={PaginationArrow}
            alt="back"
          />
        </span>

        <span className="">돌아가기</span>
      </div>

      <TableBox>
        <div className="relative flex flex-col gap-4 md:gap-6">
          <div className="mb-2">프로필</div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-4">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <div
                className="relative flex justify-center items-center w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-[6px] bg-[#F5F5F5] cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                {selectedFile ? (
                  <Image
                    fill
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected"
                    className="relative w-full h-full object-cover rounded-[6px]"
                  />
                ) : (
                  <span className="relative w-5 h-5">
                    <Image src={AddButtonFill} alt="add" />
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <UserInformationInput labelName="이메일" />
              <UserInformationInput labelName="닉네임" />
            </div>
          </div>

          <div className="relative flex justify-end">
            <CtaDefault onClick={handleUpload} size="xsmall">
              저장
            </CtaDefault>
          </div>
        </div>
      </TableBox>

      <TableBox>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="mb-2">비밀번호 변경</div>
          <div className="flex flex-col gap-4">
            <div>현재 비밀번호</div>
            <UserInformationInput
              labelName="현재 비밀번호"
              placeholder="현재 비밀번호 입력"
            />
            <UserInformationInput
              labelName="새 비밀번호"
              placeholder="새 비밀번호 입력"
            />
            <UserInformationInput
              labelName="새 비밀번호 확인"
              placeholder="새 비밀번호 입력"
            />
          </div>
          <div className="relative flex justify-end">
            <CtaDefault size="xsmall">변경</CtaDefault>
          </div>
        </div>
      </TableBox>
    </div>
  );
}
