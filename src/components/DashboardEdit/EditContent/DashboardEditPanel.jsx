/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import { CheckIconWhite } from '@/../public/images';
import { circleColorList } from '@/utils/circleColorList';
import { axiosPut } from '@/features/axios';
import TableBox from '@/components/common/Table/TableBox';
import UserInformationInput from '@/components/common/SignInput/UserInformationInput';

export default function DashboardEditPanel({ dashboardId, dashboardInfo }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [dashboardChange, setDashboardChange] = useState({
    title: dashboardInfo.title,
    color: dashboardInfo.color,
  });
  const findColorName = (dashboardColor) => {
    const selectedColorName = Object.keys(circleColorList).find(
      (key) => circleColorList[key] === dashboardColor,
    );
    setSelectedColor(selectedColorName);
  };

  useEffect(() => {
    findColorName(dashboardChange.color);
  }, []);

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

  const handleEditClick = async () => {
    const colorCode = circleColorList[selectedColor];

    try {
      const body = {
        title: inputValue,
        color: colorCode,
      };
      await axiosPut(`/dashboards/${dashboardId}`, body);
      window.location.reload();
    } catch (error) {
      return;
    }
  };

  const isDisabled = !inputValue || !selectedColor;

  return (
    <TableBox>
      <div className="relative flex flex-col gap-4 md:gap-6">
        <h2 className="mb-2 text-xl md:text-2xl font-bold">
          {dashboardChange.title}
        </h2>
        <div>
          <span className="text-base md:text-lg font-medium">
            대시보드 이름
          </span>
          <UserInformationInput
            onChange={handleInputChange}
            placeholder="이름을 입력해 주세요."
          />
        </div>
        <div className="flex lg:justify-between md:justify-start items-center flex-wrap mb-[18px] md:w-[287px]">
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
                  alt="체크아이콘"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex w-full justify-between md:justify-end md:gap-3">
          <CtaDefault
            size="xsmall"
            onClick={handleEditClick}
            disabled={isDisabled}
          >
            변경
          </CtaDefault>
        </div>
      </div>
    </TableBox>
  );
}
