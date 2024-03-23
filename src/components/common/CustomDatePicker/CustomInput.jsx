/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { CalendarIcon } from '@/../public/images';

export const CustomInput = ({
  isFocused,
  handleFocus,
  handleBlur,
  value,
  toggleCalendar,
  onChange,
}) => {
  return (
    <div
      className="w-full flex gap-[10px] items-center py-[10px] md:py-[14px] px-4 bg-white border border-gray-D9D9D9 rounded-md"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={toggleCalendar}
      style={{
        borderColor: isFocused ? '#5534DA' : '#D9D9D9',
      }}
    >
      <Image src={CalendarIcon} alt="calendar" />
      <input className="focus:outline-none" value={value} onChange={onChange} />
    </div>
  );
};
