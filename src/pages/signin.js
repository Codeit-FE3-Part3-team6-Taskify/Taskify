import React, { useState } from 'react';
import PasswordInput from '@/components/SignInput/PasswordInput';
import UserInformationInput from '@/components/SignInput/UserInformationInput';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      setEmailError('이메일을 입력해주세요');
      return;
    }
    setEmailError('');
  };
  return (
    <div>
      SignIn
      <form onSubmit={onSubmit} className="w-1/2 m-auto">
        <UserInformationInput
          labelName="이메일"
          error={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <UserInformationInput labelName="닉네임" />
        <PasswordInput labelName="비밀번호" error="" />
        <PasswordInput labelName="비밀번호 확인" error="" />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}
