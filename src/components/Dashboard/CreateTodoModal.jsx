import { useState } from 'react';
import Modal from '../Modal/Modal';
import UserInformationInput from '../SignInput/UserInformationInput';
import Avatar from '../Avatar/Avatar';
import SelectMenu from '../SelectMenu/SelectMenu';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';
import TagInput from '../Tag/TagInput';
import FileUpload from '../FileUpload/FileUpload';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import { axiosPostFormData } from '@/features/axios';

// Todo(조예진) :  태그 추가, date-picker
export default function CreateTodoModal({ onClose }) {
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
  // console.log('formValues', formValues);

  const handleImageSelect = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axiosPostFormData('users/me/image', formData);
      if (!res.status) {
        setFormValues((prev) => ({ ...prev, imageUrl: res.profileImageUrl }));
      }
    } catch (error) {
      console.error('이미지를 업로드하는데 실패했습니다.', error);
    }
  };

  const handleCreate = async () => {
    console.log('할일 카드를 생성함');
  };

  // mock data
  const options = [
    { value: '곰돌이', label: '곰돌이' },
    { value: '토끼', label: '토끼' },
    { value: '강아지', label: '강아지' },
    { value: '고양이', label: '고양이' },
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

  const [selectedDate, setSelectedDate] = useState(null);

  const disabled = Object.values(formValues).every((value) => !!value);

  return (
    <Modal onClose={onClose}>
      <div>
        {selectedDate && (
          <p>You selected: {selectedDate.toLocaleDateString()}</p>
        )}
      </div>
      <div className="flex flex-col items-start py-7 px-5 md:py-8 md:px-7 gap-6 text-base md:text-lg font-medium text-black_333236 w-[327px] md:w-[506px] ">
        <div className="text-xl md:text-2xl font-bold ">할 일 생성</div>
        <div className="w-full">
          <div className="mb-2">담당자</div>

          <SelectMenu
            options={options}
            customStyles={customStyles}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
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
          <CustomDatePicker />
        </div>
        <div className="w-full">
          <span>태그</span>
          <TagInput setFormValues={setFormValues} />
        </div>
        <div>
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
