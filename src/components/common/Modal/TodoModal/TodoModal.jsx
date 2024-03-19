import Modal from '../Modal';
import UserInformationInput from '../../SignInput/UserInformationInput';
import SelectMenu from '../../SelectMenu/SelectMenu';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import TagInput from '../../Tag/TagInput';
import FileUpload from '../../FileUpload/FileUpload';
import CtaDefault from '../../Buttons/CtaDefault/CtaDefault';
import Avatar from '../../Avatar/Avatar';
import { axiosPostFormData } from '@/features/axios';

// TODO(조예진): 미완성- CustomDatePicker 디자인 수정

export default function TodoModal({
  isUpdate,
  onClose,
  formValues,
  setFormValues,
  onSubmit,
  assigneeOptions,
  dropdownMenu,
  disabled,
  columnId,
}) {
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

  const handleSubmit = () => {
    onSubmit(formValues);
  };

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

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-start py-7 px-5 md:py-8 md:px-7 gap-6 text-base md:text-lg font-medium text-black_333236 w-[327px] md:w-[506px] ">
        <div className="text-xl md:text-2xl font-bold ">
          {isUpdate ? '할 일 수정' : '할 일 생성'}
        </div>
        {isUpdate && (
          <div className="w-full">
            <div className="mb-2">상태</div>
            {dropdownMenu}
          </div>
        )}

        <div className="w-full">
          <div className="mb-2">담당자</div>

          <SelectMenu
            formValues={formValues}
            assigneeUserId={formValues.assigneeUserId}
            options={assigneeOptions}
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
          <CustomDatePicker
            dueDate={formValues.dueDate}
            setFormValues={setFormValues}
          />
        </div>
        <div className="flex flex-col w-full">
          <span>태그</span>
          <TagInput
            initialTag={formValues.tags}
            setFormValues={setFormValues}
          />
        </div>
        <div className="flex flex-col w-full">
          <span>이미지</span>
          <FileUpload
            imageUrl={formValues.imageUrl}
            onSelectFile={handleImageSelect}
          />
        </div>
        <div className="flex justify-center md:justify-end w-full">
          <div className="flex gap-[11px]">
            <CtaDefault color="white" onClick={onClose}>
              취소
            </CtaDefault>
            <CtaDefault onClick={handleSubmit} disabled={!disabled}>
              {isUpdate ? '수정' : '생성'}
            </CtaDefault>
          </div>
        </div>
      </div>
    </Modal>
  );
}
