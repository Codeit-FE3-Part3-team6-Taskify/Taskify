import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PasswordInput from '@/components/SignInput/PasswordInput';
import UserInformationInput from '@/components/SignInput/UserInformationInput';
import { checkSignEmail, checkSignPassword } from '@/utils/validation';
import { signInUser } from '@/features/user';
import SignLogo from '@/components/SignLogo/SignLogo';
import SignLink from '@/components/SignLink/SignLink';

// Todo(노진석) : (미완성)api로직 등 추가해야함.
export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    signInUser({ email, password }, setEmailError, setPasswordError, router);
  };
  const handleEmailBlur = () => {
    const message = checkSignEmail(email);
    setEmailError(message);
  };
  const handlePasswordBlur = () => {
    const message = checkSignPassword(password);
    setPasswordError(message);
  };
  return (
    <main className="w-full m-auto mt-36 mb-12 max-w-[351px] md:max-w-[520px] md:mt-60 lg:mt-[223px]">
      <SignLogo />
      <form onSubmit={onSubmit} className="flex flex-col w-full m-auto gap-4">
        <UserInformationInput
          labelName="이메일"
          error={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
        />
        <PasswordInput
          labelName="비밀번호"
          error={passwordError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
        />
        <button
          className="border-[1px] border-solid border-black w-full mt-1"
          type="submit"
        >
          확인
        </button>
      </form>
      <SignLink
        text="회원이 아니신가요?"
        spanText="회원가입하기"
        href="/signup"
      />
    </main>
  );
}
