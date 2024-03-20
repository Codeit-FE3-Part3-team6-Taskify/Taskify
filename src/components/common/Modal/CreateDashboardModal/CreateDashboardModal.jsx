import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Modal from '@/components/common/Modal/Modal';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import { CheckIconWhite } from '@/../public/images';
import { circleColorList } from '@/utils/circleColorList';
import { axiosPostJason } from '@/features/axios';
import { addDashboard } from '@/features/dashboardListSlice';
import { addSidebarDashboard } from '@/features/sidebarDashboardListSlice';

export default function CreateDashboardModal({ onClose }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleColorSelectClick = (color) => {
    setSelectedColor(selectedColor === color ? null : color);
  };
  const handleColorSelectKeyboard = (color, event) => {
    if (event.type === 'click' || event.keyCode === 13) {
      setSelectedColor(selectedColor === color ? null : color);
    }
  };

  const handleCreateClick = async () => {
    const colorCode = circleColorList[selectedColor];

    try {
      const body = {
        title: inputValue,
        color: colorCode,
      };
      const response = await axiosPostJason(
        'https://sp-taskify-api.vercel.app/3-6/dashboards',
        body,
      );
      dispatch(addDashboard(response));
      dispatch(addSidebarDashboard(response));

      onClose();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('대시보드 생성에 실패했습니다. 다시 시도해주세요.');
      console.log(error);
    }
  };

  const isDisabled = !inputValue || !selectedColor;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col w-[327px] h-[293px] py-[28px] px-[20px] md:w-[540px]">
        <h2 className="text-xl font-bold mb-6">새로운 대시보드</h2>
        <div>
          <p className="text-sm font-medium mb-[10px]">대시보드 이름</p>
          <input
            className="w-full rounded-[6px] border-2 h-[37px] pl-3 mb-[18px]"
            type="text"
            onChange={handleInputChange}
            placeholder="이름을 입력해 주세요."
          />
        </div>
        <div className="flex justify-between items-center flex-wrap mb-[18px] md:w-[287px]">
          {Object.keys(circleColorList).map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelectClick(color)}
              onKeyDown={(event) => handleColorSelectKeyboard(color, event)}
              style={{
                backgroundColor: circleColorList[color],
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                margin: '5px',
              }}
              tabIndex="0"
              aria-label={`${color} 색상 선택`}
            >
              {selectedColor === color && (
                <Image
                  src={CheckIconWhite}
                  width={25}
                  height={25}
                  alt="체크아이곤"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex w-full justify-between md:justify-end md:gap-3">
          <CtaDefault size="medium" color="white" onClick={onClose}>
            취소
          </CtaDefault>
          <CtaDefault
            size="medium"
            onClick={handleCreateClick}
            disabled={isDisabled}
          >
            생성
          </CtaDefault>
        </div>
      </div>
    </Modal>
  );
}
