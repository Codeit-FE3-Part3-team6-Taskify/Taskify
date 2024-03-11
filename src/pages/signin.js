import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PasswordInput from '@/components/SignInput/PasswordInput';
import UserInformationInput from '@/components/SignInput/UserInformationInput';
import { checkLoginEmail, checkLoginPassword } from '@/utils/validation';
import { Logo, LogoImg } from '../../public/images';

// Todo(노진석) : (미완성)api로직 등 추가해야함.
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const handleEmailBlur = () => {
    const message = checkLoginEmail(email);
    setEmailError(message);
  };
  const handlePasswordBlur = () => {
    const message = checkLoginPassword(password);
    setPasswordError(message);
  };
  return (
    <main className="w-full  max-w-520px m-auto mt-12 mb-12">
      <div className="flex flex-col items-center gap-7">
        <Image src={LogoImg} width={164} height={189} alt="로고이미지" />
        <Image src={Logo} width={198} height={55} alt="로고이름" />
      </div>
      <h3 className="mt-3 mb-4 text-center font-medium text-xl ">
        오늘도 만나서 반가워요!
      </h3>

      <form onSubmit={onSubmit} className="w-full m-auto">
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
        <button className="w-full mt-5" type="submit">
          확인
        </button>
      </form>
      <p className="text-center">
        회원이 아니신가요?
        <Link className="ml-2" href="/signup">
          <span>회원가입하기</span>
        </Link>
      </p>
    </main>
  );
}
