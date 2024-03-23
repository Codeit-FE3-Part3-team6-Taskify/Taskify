/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import { CalendarIcon } from '@/../public/images';

export default function CustomDatePicker({ dueDate, setFormValues }) {
  const inputRef = useRef();
  const initialDate = dueDate ? new Date(dueDate) : new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleFocus = () => {
    console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.classList.add('border-violet_5534DA');
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.classList.remove('border-violet_5534DA');
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={10}
      timeCaption="시간"
      dateFormat="yyyy.MM.dd HH:mm"
      customInput={
        <CustomInput
          inputRef={inputRef}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          toggleCalendar={() => setIsOpen(!isOpen)}
        />
      }
      open={isOpen}
      onCalendarClose={() => setIsOpen(false)}
      onClickOutside={() => setIsOpen(false)}
    />
  );
}

function CustomInput({
  inputRef,
  handleFocus,
  handleBlur,
  value,
  toggleCalendar,
  onChange,
}) {
  return (
    <div
      ref={inputRef}
      className="w-full flex gap-[10px] items-center py-[10px] md:py-[14px] px-4 bg-white border border-gray-D9D9D9 rounded-md focus:outline-none focus:border-violet_5534DA"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={toggleCalendar}
    >
      <Image src={CalendarIcon} alt="calendar" />
      <input className="focus:outline-none" value={value} onChange={onChange} />
    </div>
  );
}
