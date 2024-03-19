import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import { CalendarIcon } from '@/../public/images';

export default function CustomDatePicker({ dueDate, setFormValues }) {
  const initialDate = dueDate ? new Date(dueDate) : new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // 할일 수정 - 마감일을 가져옴
  useEffect(() => {
    setSelectedDate(initialDate);
  }, [dueDate]);

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm');

    setFormValues((prev) => ({
      ...prev,
      dueDate: formattedDate,
    }));

    setSelectedDate(date);
  };

  //  할일 생성 - 날짜 선택 안 하면 현재시각을 마감일로 지정
  useEffect(() => {
    if (!dueDate) {
      handleDateChange(new Date());
    }
  }, [dueDate]);

  return (
    <DatePicker
      showIcon
      showTimeSelect
      dateFormat="yyyy.MM.dd HH:mm"
      shouldCloseOnSelect
      selected={selectedDate}
      onChange={handleDateChange}
      icon={<Image src={CalendarIcon} alt="calendar" />}
      placeholderText="날짜를 입력해 주세요"
      className="w-full  py-[15px] px-4 bg-white border border-gray-D9D9D9 rounded-md p-2 focus:outline-none focus:border-violet_5534DA"
    />
  );
}
