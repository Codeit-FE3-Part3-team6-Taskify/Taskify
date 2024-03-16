/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react';
import Image from 'next/image';
import Select, { components } from 'react-select';
import Modal from '../Modal/Modal';
import UserInformationInput from '../SignInput/UserInformationInput';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import Avatar from '../Avatar/Avatar';
import { AddImg, CheckIcon } from '../../../public/images';

// Todo(조예진) : 이미지업로드, 태그 추가, date-picker
export default function CreateTodoModal({ onClose }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // mock data
  const options = [
    { value: '곰돌이', label: '곰돌이' },
    { value: '토끼', label: '토끼' },
    { value: '강아지', label: '강아지' },
    { value: '고양이', label: '고양이' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      height: '60px',
      borderRadius: '8px',
      padding: '11px 16px',
      fontSize: '16px',
      borderColor: state.isFocused ? '#5534DA' : provided.borderColor,
      '&:hover': {
        borderColor: state.isFocused ? '#5534DA' : provided.borderColor,
      },
      boxShadow: 'none',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: () => null,
  };

  const getOptionLabel = (option) => (
    <div className="flex items-center gap-[6px]">
      <Avatar text={option.label.charAt(0)} />
      <span>{option.label}</span>
    </div>
  );
  const getOptionValue = (option) => option.value;

  const CustomOption = ({ data, isSelected, ...props }) => (
    <components.Option {...props}>
      <div
        className={`flex items-center gap-[6px]  ${isSelected ? 'pl-0' : 'pl-[41px]'} `}
      >
        {isSelected && (
          <Image
            src={CheckIcon}
            style={{ marginLeft: 8, marginRight: 5 }}
            width={22}
            height={22}
            alt="selected"
          />
        )}
        <span className="">
          <Avatar text={data.label.charAt(0)} />
        </span>

        <span>{data.label}</span>
      </div>
    </components.Option>
  );

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-start py-7 px-5 md:py-8 md:px-7 gap-6 text-base md:text-lg font-medium text-black_333236 w-[327px] md:w-[506px] ">
        <div className="text-xl md:text-2xl font-bold ">할 일 생성</div>
        <div className="w-full">
          <div className="mb-2">담당자</div>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="이름을 입력해 주세요"
            styles={customStyles}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            components={{
              Option: CustomOption,
            }}
          />
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
