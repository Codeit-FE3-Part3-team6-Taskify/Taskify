/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko'; // 한국어 설정 파일 불러오기
import dayjs from 'dayjs';
import { CustomInput } from './CustomInput';

export default function CustomDatePicker({ dueDate, setFormValues }) {
  const initialDate = dueDate ? new Date(dueDate) : new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef();

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
    setIsOpen(false);
  };

  useEffect(() => {
    if (!dueDate) {
      handleDateChange(new Date());
    }
  }, [dueDate]);

  return (
    <DatePicker
      locale={ko}
      minDate={new Date()}
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={10}
      timeCaption="시간"
      dateFormat="yyyy.MM.dd HH:mm"
      customInput={
        <CustomInput
          isFocused={isFocused}
          handleFocus={() => setIsFocused(true)}
          handleBlur={() => setIsFocused(false)}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          toggleCalendar={() => setIsOpen(!isOpen)}
          ref={ref}
        />
      }
      open={isOpen}
      onCalendarClose={() => setIsOpen(false)}
      onClickOutside={() => setIsOpen(false)}
    />
  );
}
