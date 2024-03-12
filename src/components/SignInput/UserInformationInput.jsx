import React from 'react';

/**
 *
 * @param {string} labelName : 이메일, 닉네임
 * @param {string} error : 에러메세지
 * @param {*} ...rest : input 로직
 * @returns label-input
 */

// Todo(노진석) : 완성
export default function UserInformationInput({ labelName, error, ...rest }) {
  let className = 'sign-input-base ';
  className += error ? 'border-red_D6173A' : 'border-gray_D9D9D9';
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="text-base text-black_4B4B4B font-normal"
        htmlFor={labelName}
      >
        {labelName}
      </label>
      <input
        className={className}
        type="text"
        id={labelName}
        placeholder={`${labelName}을 입력해주세요`}
        {...rest}
      />
      <span className="text-sm font-normal leading-normal not-italic text-red-600 ">
        {error}
      </span>
    </div>
  );
}
