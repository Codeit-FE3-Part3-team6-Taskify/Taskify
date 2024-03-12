import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PasswordInput from '@/components/SignInput/PasswordInput';
import UserInformationInput from '@/components/SignInput/UserInformationInput';
import { checkLoginEmail, checkLoginPassword } from '@/utils/validation';
import { Logo, LogoImg } from '../../public/images';
import { signInUser } from '@/features/user';

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
    const message = checkLoginEmail(email);
    setEmailError(message);
  };
  const handlePasswordBlur = () => {
    const message = checkLoginPassword(password);
    setPasswordError(message);
  };
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
        <button className="w-full mt-1" type="submit">
          확인
        </button>
      </form>
      <p className="text-center mt-6 text-base font-normal">
        회원이 아니신가요?
        <Link className="ml-2" href="/signup">
          <span>회원가입하기</span>
        </Link>
      </p>
    </main>
  );
}
