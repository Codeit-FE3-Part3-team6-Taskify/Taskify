import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PasswordInput from '@/components/common/SignInput/PasswordInput';
import UserInformationInput from '@/components/common/SignInput/UserInformationInput';
import { checkSignEmail, checkSignPassword } from '@/utils/validation';
import { signInUser } from '@/features/user';
import SignLogo from '@/components/common/SignLogo/SignLogo';
import SignLink from '@/components/common/SignLink/SignLink';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import useModal from '@/hooks/useModal';
import useRedirectWithAccessToken from '@/hooks/useRedirectWithAccessToken';

// Todo(노진석) : 완성
export default function SignInPage() {
  useRedirectWithAccessToken('/mydashboard');
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { openModal } = useModal();
  const onSubmit = (e) => {
    e.preventDefault();
    const emailErrorMessage = checkSignEmail(email);
    const passwordErrorMessage = checkSignPassword(password);
    setEmailError(emailErrorMessage);
    setPasswordError(passwordErrorMessage);
    if (emailErrorMessage !== '' || passwordErrorMessage !== '') {
      return;
    }
    signInUser({
      data: { email, password },
      router,
      dispatch,
      openModal,
    });
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
      <form onSubmit={onSubmit} className="flex flex-col mx-3 w-full gap-4">
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
        <CtaDefault size="large" type="submit">
          로그인
        </CtaDefault>
      </form>
      <SignLink
        text="회원이 아니신가요?"
        spanText="회원가입하기"
        href="/signup"
      />
    </main>
  );
}
