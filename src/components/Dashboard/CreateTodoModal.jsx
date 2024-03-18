/* eslint-disable object-shorthand */
import { useEffect, useState } from 'react';
import Modal from '../common/Modal/Modal';
import UserInformationInput from '../common/SignInput/UserInformationInput';
import Avatar from '../common/Avatar/Avatar';
import SelectMenu from '../common/SelectMenu/SelectMenu';
import CustomDatePicker from '../common/CustomDatePicker/CustomDatePicker';
import TagInput from '../common/Tag/TagInput';
import FileUpload from '../common/FileUpload/FileUpload';
import CtaDefault from '../common/Buttons/CtaDefault/CtaDefault';
import { axiosPostJason, axiosPostFormData } from '@/features/axios';

// Todo(조예진) : 미완성- CustomDatePicker 디자인 수정
export default function CreateTodoModal({ onClose, dashboardId, columnId }) {
  // 모달을 클릭했을 때 dashboardId, columnId도 넘겨준다고 가정
  const [formValues, setFormValues] = useState({
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: '',
    tags: [''],
    imageUrl: '',
  });

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      dashboardId: dashboardId,
      columnId: columnId,
    }));
  }, []);

  const handleImageSelect = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axiosPostFormData(
        `columns/${columnId}/card-image`,
        formData,
      );

      if (!res.status) {
        setFormValues((prev) => ({ ...prev, imageUrl: res.imageUrl }));
      }
    } catch (error) {
      console.error('이미지를 업로드하는데 실패했습니다.', error);
    }
  };

  // 모든 인풋이 채워지면 버튼 활성화..? 이럴거면 제목이랑 설명란에 *는 왜있는거임;; 다 필순데?
  const handleCreate = async () => {
    try {
      const res = await axiosPostJason('cards', formValues);

      if (!res.status) {
        console.log('생성완료');
        onClose();
      }
    } catch (e) {
      console.log(e);
      console.log('할 일 생성 실패');
    }
  };

  // mock data- id: 대시보드 멤버 목록 조회-userId 사용
  const options = [
    { id: 1244, value: '곰돌이', label: '곰돌이' },
    { id: 6801, value: '토끼', label: '토끼' },
    { id: 1244, value: '강아지', label: '강아지' },
    { id: 6801, value: '고양이', label: '고양이' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      height: '100%',
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

  const disabled = Object.values(formValues).every((value) => !!value);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-start py-7 px-5 md:py-8 md:px-7 gap-6 text-base md:text-lg font-medium text-black_333236 w-[327px] md:w-[506px] ">
        <div className="text-xl md:text-2xl font-bold ">할 일 생성</div>
        <div className="w-full">
          <div className="mb-2">담당자</div>

          <SelectMenu
            options={options}
            customStyles={customStyles}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            setFormValues={setFormValues}
          />
        </div>

        <div className="w-full">
          <span>제목 </span>
          <span className="text-violet_5534DA">*</span>
          <UserInformationInput
            value={formValues.title}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className="w-full">
          <span>설명 </span>
          <span className="text-violet_5534DA">*</span>
          <UserInformationInput
            value={formValues.description}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="설명을 입력해 주세요"
          />
        </div>
        <div className="flex flex-col w-full">
          <span>마감일</span>
          <CustomDatePicker setFormValues={setFormValues} />
        </div>
        <div className="flex flex-col w-full">
          <span>태그</span>
          <TagInput setFormValues={setFormValues} />
        </div>
        <div className="flex flex-col w-full">
          <span>이미지</span>
          <FileUpload onSelectFile={handleImageSelect} />
        </div>
        <div className="flex justify-center md:justify-end w-full">
          <div className="flex gap-[11px]">
            <CtaDefault color="white" onClick={onClose}>
              취소
            </CtaDefault>
            <CtaDefault onClick={handleCreate} disabled={!disabled}>
              생성
            </CtaDefault>
          </div>
        </div>
      </div>
    </Modal>
  );
}
