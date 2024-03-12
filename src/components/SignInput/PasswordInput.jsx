import React, { useState } from 'react';
import Image from 'next/image';
import { EyesOff, EyesOn } from '@/../public/images';

const EYE_ON = {
  src: EyesOn,
  alt: '비밀번호 보이는 아이콘',
};

const EYE_OFF = {
  src: EyesOff,
  alt: '비밀번호 안 보이는 아이콘',
};

/**
 *
 * @param {string} labelName : 비밀번호, 비밀번호 확인
 * @param {string} error : errormessage
 * @param {*} ...rest : input 로직
 * @returns label-passwordInput
 */

// Todo(노진석) : 완성
export default function PasswordInput({ labelName, error, ...rest }) {
  const [eyes, setEyes] = useState(EYE_OFF);
  const changeEye = () => {
    if (eyes.alt === EYE_OFF.alt) {
      setEyes(EYE_ON);
      return;
    }
    setEyes(EYE_OFF);
  };
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
      <div className="relative w-full">
        <input
          className={className}
          type={eyes.alt === EYE_ON.alt ? 'text' : 'password'}
          id={labelName}
          placeholder="비밀번호를 입력해주세요"
          autoComplete="password"
          {...rest}
        />
        <Image
          className="absolute top-3 right-4 cursor-pointer"
          onClick={changeEye}
          width={24}
          height={24}
          src={eyes.src}
          alt={eyes.alt}
        />
      </div>
      <span className="text-sm font-normal leading-normal not-italic text-red-600">
        {error}
      </span>
    </div>
  );
}
