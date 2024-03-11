import React, { useState } from 'react';
import EmailInput from '@/components/SignInput/EmailInput';
import PasswordInput from '@/components/SignInput/PasswordInput';

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
        <EmailInput
          error={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput labelName="비밀번호" />
        <PasswordInput labelName="비밀번호 확인" />
      </form>
    </div>
  );
}
