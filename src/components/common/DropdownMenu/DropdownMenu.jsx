/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import StatusTag from '../StatusTag/StatusTag';
import { DropDownArrow, CheckIcon } from '@/../public/images/index';
import useOutsideClick from '@/hooks/useOutSideClick';

export default function DropdownMenu({ initialStatus, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownRef = useRef(null);
  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, handleCloseDropdown);

  useEffect(() => {
    const findOption = options.find((option) => option.id === initialStatus);
    setSelectedOption(findOption);
  }, [initialStatus, options]);

  const handleSelect = (option) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col gap-0.5">
      <button
        className=" flex items-start justify-between rounded-lg border border-gray_D9D9D9 focus:border-violet_5534DA py-[14px] px-4"
        onClick={handleClick}
      >
        {selectedOption ? (
          <StatusTag>{selectedOption.title}</StatusTag>
        ) : (
          options.length > 0 && <StatusTag>{options[0].title}</StatusTag>
        )}
        <Image src={DropDownArrow} alt="arrow" width={26} height={26} />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-1 w-full flex flex-col items-start gap-[13px] py-[14px] bg-white_FFFFFF  rounded-lg border border-gray_D9D9D9 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] "
        >
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center ml-2 gap-[6px] w-full cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {selectedOption && selectedOption.id === option.id && (
                <Image src={CheckIcon} alt="check" />
              )}
              <div
                className={`${selectedOption && selectedOption.id === option.id ? 'ml-0' : 'ml-[28px]'}`}
              >
                <StatusTag>{option.title}</StatusTag>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
