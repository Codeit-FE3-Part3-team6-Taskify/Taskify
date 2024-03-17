import { useRouter } from 'next/router';
import React, { useState } from 'react';
import UserInformationInput from '@/components/common/SignInput/UserInformationInput';
import PasswordInput from '@/components/common/SignInput/PasswordInput';
import {
  checkNickname,
  checkPasswordConfirmed,
  checkSignEmail,
  checkSignPassword,
} from '@/utils/validation';
import { signUpUser } from '@/features/user';
import SignLogo from '@/components/common/SignLogo/SignLogo';
import SignLink from '@/components/common/SignLink/SignLink';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';

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
  const disabled =
    Object.values(formValues).every((value) => !!value) &&
    Object.values(errors).every((error) => !error);
  return (
    <main className="w-full m-auto mt-36 mb-12 max-w-[351px] md:max-w-[520px] md:mt-60 lg:mt-[223px]">
      <SignLogo />
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
          placeholder="10자 이하로 작성해주세요"
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
        <CtaDefault size="large" type="submit" disabled={!disabled}>
          회원가입
        </CtaDefault>
      </form>
      <SignLink
        text="이미 가입하셨나요?"
        spanText="로그인하기"
        href="/signin"
      />
    </main>
  );
}
