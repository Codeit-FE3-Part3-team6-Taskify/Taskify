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
  let className =
    'px-4 py-15px rounded-lg bg-white focus:border-blue-55 focus:outline-none w-full ';
  className += error ? 'border-red-d6' : 'border-gray-d9';
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="text-base text-black-33 font-normal"
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
      <span className="text-sm font-normal text-red-600">{error} </span>
    </div>
  );
}
