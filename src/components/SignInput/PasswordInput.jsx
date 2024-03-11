import React from 'react';

export default function PasswordInput({ labelName, error, ...rest }) {
  let className =
    'px-4 py-15px rounded-lg bg-white focus:border-blue-55 focus:outline-none ';
  className += error ? 'border-red-d6' : 'border-gray-d9';
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-base text-black-33 font-normal"
        htmlFor={labelName}
      >
        {labelName}
      </label>
      <input
        className={className}
        type="password"
        id={labelName}
        placeholder="비밀번호를 입력해주세요"
        autoComplete="password"
        {...rest}
      />
      <span className="text-sm font-normal text-red-600">{error}</span>
    </div>
  );
}