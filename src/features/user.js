/* eslint-disable no-useless-return */
import { axiosPost } from './axios';
import { checkLoginEmail, checkLoginPassword } from '@/utils/validation';

export const signInUser = async (
  data,
  setEmailError,
  setPasswordError,
  router,
) => {
  const emailErrorMessage = checkLoginEmail(data.email);
  const passwordErrorMessage = checkLoginPassword(data.password);
  await setEmailError(emailErrorMessage);
  await setPasswordError(passwordErrorMessage);
  if (emailErrorMessage !== '' || passwordErrorMessage !== '') {
    return;
  }
  const res = await axiosPost('auth/login', data);
  if (!res.status) {
    router.push('/');
    return;
  }
  if (res.status === 400) {
    setPasswordError('비밀번호가 일치하지 않습니다.');
    return;
  }
  setEmailError('존재하지 않는 유저입니다.');
  return;
};
