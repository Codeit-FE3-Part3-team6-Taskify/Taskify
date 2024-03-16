/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react';
import Image from 'next/image';
import Select from 'react-select';
import Modal from '../Modal/Modal';
import UserInformationInput from '../SignInput/UserInformationInput';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import { AddImg } from '../../../public/images';

export default function CreateTodoModal({ onClose }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const options = [
    { value: 'bear', label: '곰돌이', image: '/images/SettingIcon.svg' },
    { value: 'rabbit', label: '토끼', image: '/images/SettingIcon.svg' },
    { value: 'puppy', label: '강아지', image: '/images/SettingIcon.svg' },
    { value: 'kitty', label: '고양이', image: '/images/SettingIcon.svg' },
  ]; // select 태그 안에 들어가는 아이템

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-start py-7 px-5 md:py-8 md:px-7 gap-6 text-base md:text-lg font-medium text-black_333236 w-[327px] md:w-[506px] ">
        <div className="text-xl md:text-2xl font-bold ">할 일 생성</div>
        <div className="w-full">
          <div className="mb-2">담당자</div>
          <Select options={options} placeholder="이름을 입력해 주세요" />
        </div>

        <div className="w-full">
          <span>제목 </span>
          <span className="text-violet_5534DA">*</span>
          <UserInformationInput placeholder="제목을 입력해 주세요" />
        </div>
        <div className="w-full">
          <span>설명 </span>
          <span className="text-violet_5534DA">*</span>
          <UserInformationInput placeholder="설명을 입력해 주세요" />
        </div>
        <div className="w-full">
          <span>마감일</span>
          <UserInformationInput placeholder="날짜를 입력해 주세요" />
        </div>
        <div className="w-full">
          <span>태그</span>
          <UserInformationInput placeholder="입력 후 Enter" />
        </div>
        <div>
          <span>이미지</span>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <div
              className="relative overflow-hidden flex w-[58px] h-[58px] md:w-[76px] md:h-[76px] rounded-[6px] bg-[#F5F5F5] cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {selectedFile ? (
                <Image
                  fill
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                />
              ) : (
                <Image fill src={AddImg} alt="add" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end w-full">
          <div className="flex gap-[11px]">
            <CtaDefault color="white" onClick={onClose}>
              취소
            </CtaDefault>
            <CtaDefault onClick={onClose}>확인</CtaDefault>
          </div>
        </div>
      </div>
    </Modal>
  );
}
