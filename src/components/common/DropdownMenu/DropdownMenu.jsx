/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import StatusTag from '../StatusTag/StatusTag';
import { DropDownArrow, CheckIcon } from '@/../public/images/index';

export default function DropdownMenu({ initialStatus, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const findOption = options.find((option) => option.value === initialStatus);
    setSelectedOption(findOption);
  }, [initialStatus, options]);

  const handleSelect = (option) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-0.5">
      <button
        className="flex items-start justify-between rounded-lg border border-gray_D9D9D9 py-[13px] px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <StatusTag>{selectedOption.label}</StatusTag>
        ) : (
          options.length > 0 && <StatusTag>{options[0].label}</StatusTag>
        )}
        <Image src={DropDownArrow} alt="arrow" width={26} height={26} />
      </button>
      {isOpen && (
        <div className="flex flex-col items-start gap-[13px] py-[13px]  rounded-lg border border-gray_D9D9D9 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] ">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center ml-2 gap-[6px] w-full cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {selectedOption && selectedOption.value === option.value && (
                <Image src={CheckIcon} alt="check" />
              )}
              <div
                className={`${selectedOption && selectedOption.value === option.value ? 'ml-0' : 'ml-[28px]'}`}
              >
                <StatusTag>{option.label}</StatusTag>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
