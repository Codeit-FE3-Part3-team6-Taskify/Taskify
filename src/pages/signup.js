import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Logo, LogoImg } from '../../public/images';
import UserInformationInput from '@/components/SignInput/UserInformationInput';
import PasswordInput from '@/components/SignInput/PasswordInput';
import {
  checkNickname,
  checkPasswordConfirmed,
  checkSignEmail,
  checkSignPassword,
} from '@/utils/validation';
import { signUpUser } from '@/features/user';

export default function SignUpPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmed: '',
    checkbox: false,
  });
  const [errors, setErrors] = useState({
    emailError: '',
    nicknameError: '',
    passwordError: '',
    passwordConfirmedError: '',
  });
  const onSubmit = (e) => {
    e.preventDefault();
    signUpUser(formValues, setErrors, router);
  };
  const handleBlur = (validateFunction, errorType, ...param) => {
    const result = validateFunction(...param);
    setErrors((prev) => ({ ...prev, [errorType]: result }));
  };
  const onChange = (formValueType, value) => {
    setFormValues((prev) => ({ ...prev, [formValueType]: value }));
  };
  const disable =
    Object.values(formValues).every((value) => !!value) &&
    Object.values(errors).every((error) => !error);
  return (
    <main className="w-full m-auto mt-36 mb-12 max-w-[351px] md:max-w-[520px] md:mt-60 lg:mt-[223px]">
      <Link
        href="/"
        className="flex flex-col items-center gap-[18px] md:gap-[30px]"
      >
        <Image
          className="ml-9 w-[98px] h-[113px] md:w-[164px] md:h-[189px]"
          src={LogoImg}
          alt="로고이미지"
        />
        <Image
          className="w-[119px] h-[33px] md:w-[198px] md:h-[55px]"
          src={Logo}
          alt="로고이름"
        />
      </Link>
      <h3 className="mt-[8px] mb-10  text-center font-medium text-xl  md:mb-[60px]">
        오늘도 만나서 반가워요!
      </h3>

      <form onSubmit={onSubmit} className="flex flex-col w-full m-auto gap-4">
        <UserInformationInput
          labelName="이메일"
          error={errors.emailError}
          value={formValues.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() =>
            handleBlur(checkSignEmail, 'emailError', formValues.email)
          }
        />
        <UserInformationInput
          labelName="닉네임"
          error={errors.nicknameError}
          value={formValues.nickname}
          onChange={(e) => onChange('nickname', e.target.value)}
          onBlur={() =>
            handleBlur(checkNickname, 'nicknameError', formValues.nickname)
          }
        />
        <PasswordInput
          labelName="비밀번호"
          error={errors.passwordError}
          value={formValues.password}
          onChange={(e) => onChange('password', e.target.value)}
          onBlur={() =>
            handleBlur(checkSignPassword, 'passwordError', formValues.password)
          }
          placeholder="8자 이상 입력해주세요"
        />
        <PasswordInput
          labelName="비밀번호 확인"
          error={errors.passwordConfirmedError}
          value={formValues.passwordConfirmed}
          onChange={(e) => onChange('passwordConfirmed', e.target.value)}
          onBlur={() =>
            handleBlur(
              checkPasswordConfirmed,
              'passwordConfirmedError',
              formValues.password,
              formValues.passwordConfirmed,
            )
          }
          placeholder="비밀번호를 한번 더 입력해주세요"
        />
        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            id="checkbox"
            value={formValues.checkbox}
            onChange={() => onChange('checkbox', !formValues.checkbox)}
          />
          <label htmlFor="checkbox">이용약관에 동의합니다.</label>
        </div>
        <button
          className="border-[1px] border-solid border-black w-full mt-1"
          type="submit"
          disabled={!disable}
        >
          확인
        </button>
      </form>
      <p className="text-center mt-[21px] text-base font-normal">
        이미 가입하셨나요?
        <Link className="ml-2 text-violet_5534DA underline " href="/signin">
          <span>로그인하기</span>
        </Link>
      </p>
    </main>
  );
}
