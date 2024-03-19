/* eslint-disable object-shorthand */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosPostJason } from '@/features/axios';
import Modal from '../Modal';
import UserInformationInput from '@/components/common/SignInput/UserInformationInput';
import ToastNotification from '../../ToastNotification/ToastNotification';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import { addColumn } from '@/features/columnsSlice';

export default function InputModal({ onClose, dashboardId }) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [toastState, setToastState] = useState({
    isVisible: false,
    message: '',
  });
  const columns = useSelector((state) => state.columnList);
  const titles = columns.map((column) => column.title);
  const isInputEmpty = inputValue.trim() === '';

  const isDuplicationTitle = () => titles.includes(inputValue);

  const postColumn = async () => {
    try {
      const res = await axiosPostJason('/columns', {
        title: inputValue,
        dashboardId,
      });
      dispatch(addColumn({ data: res }));
    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
  };

  const handleButtonClick = () => {
    if (isDuplicationTitle()) {
      setToastState({ isVisible: true, message: '중복된 컬럼 이름입니다.' });
      return;
    }

    if (titles.length >= 10) {
      setToastState({
        isVisible: true,
        message: '칼럼은 최대 10개까지 생성이 가능합니다.',
      });
      return;
    }

    postColumn();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col justify-center md:gap-4 sm:gap-3 md:px-7 md:py-8 sm:px-5 sm:py-5 md:w-[540px] md:h-[276px] sm:w-[80vw] sm:h-[274px] py-7 relative">
        <h2 className="md:text-2xl sm:text-xl font-bold">새 칼럼 생성</h2>
        <div>
          <UserInformationInput
            labelName="이름"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <CtaDefault color="white" onClick={onClose}>
            취소
          </CtaDefault>
          <CtaDefault disabled={isInputEmpty} onClick={handleButtonClick}>
            생성
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
