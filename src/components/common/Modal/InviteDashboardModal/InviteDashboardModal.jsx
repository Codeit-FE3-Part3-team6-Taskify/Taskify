/* eslint-disable object-shorthand */
import { useState } from 'react';
import { axiosPostJason } from '@/features/axios';
import Modal from '../Modal';
import UserInformationInput from '@/components/common/SignInput/UserInformationInput';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import ToastNotification from '../../ToastNotification/ToastNotification';
import { checkSignEmail } from '@/utils/validation';

export default function InputModal({ onClose, dashboardId }) {
  const [inputValue, setInputValue] = useState('');
  const [toastState, setToastState] = useState({
    isVisible: false,
    message: '',
  });
  const isInputEmpty = inputValue.trim() === '';

  const postInvitations = async () => {
    try {
      await axiosPostJason(`/dashboards/${dashboardId}/invitations`, {
        email: inputValue,
      });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('데이터 전송에 실패했습니다.');
    }
  };

  const handleButtonClick = () => {
    const isValidEmail = checkSignEmail(inputValue);

    if (isValidEmail === '') {
      postInvitations();
    } else {
      setToastState({ isVisible: true, message: isValidEmail });
    }

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col justify-center md:gap-4 sm:gap-3 md:px-7 md:py-8 sm:px-5 sm:py-5 md:w-[540px] md:h-[276px] sm:w-[80vw] sm:h-[274px] py-7 relative">
        <h2 className="md:text-2xl sm:text-xl font-bold">초대하기</h2>
        <div>
          <UserInformationInput
            labelName="이메일"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <CtaDefault color="white" onClick={onClose}>
            취소
          </CtaDefault>
          <CtaDefault disabled={isInputEmpty} onClick={handleButtonClick}>
            초대
          </CtaDefault>
        </div>
      </div>
      {toastState.isVisible && (
        <ToastNotification setToastState={setToastState}>
          {toastState.message}
        </ToastNotification>
      )}
    </Modal>
  );
}
