import { useState } from 'react';
import Modal from '../Modal';
import UserInformationInput from '@/components/common/SignInput/UserInformationInput';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';

export default function InputModal({
  onClose,
  title,
  labelName,
  submitButtonText,
  handleConfirm,
}) {
  const [inputValue, setInputValue] = useState('');
  const isInputEmpty = inputValue.trim() === '';

  const handleButtonClick = () => {
    handleConfirm(inputValue);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col justify-center md:gap-4 sm:gap-3 md:px-7 md:py-8 sm:px-5 sm:py-5 md:w-[540px] md:h-[276px] sm:w-[80vw] sm:h-[274px] py-7 relative">
        <h2 className="md:text-2xl sm:text-xl font-bold">{title}</h2>
        <div>
          <UserInformationInput
            labelName={labelName}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <CtaDefault color="white" onClick={onClose}>
            취소
          </CtaDefault>
          <CtaDefault disabled={isInputEmpty} onClick={handleButtonClick}>
            {submitButtonText}
          </CtaDefault>
        </div>
      </div>
    </Modal>
  );
}
