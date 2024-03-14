/* eslint-disable no-useless-return */
import { axiosPost } from './axios';
import { checkSignEmail, checkSignPassword } from '@/utils/validation';

// Todo (노진석) : 나중에 모달 + user데이터 + accessToken 넣기
export const signInUser = async (
  data,
  setEmailError,
  setPasswordError,
  router,
) => {
  const emailErrorMessage = checkSignEmail(data.email);
  const passwordErrorMessage = checkSignPassword(data.password);
  setEmailError(emailErrorMessage);
  setPasswordError(passwordErrorMessage);
  if (emailErrorMessage !== '' || passwordErrorMessage !== '') {
    return;
  }
  const res = await axiosPost('auth/login', data);
  if (!res.status) {
    // 나중에 유저 정보를 툴킷 데이터에 담기
    // 임시로 alert로 대체
    localStorage.setItem('accessToken', res.accessToken);
    alert('로그인 성공');
    router.push('/');
    return;
  }
  if (res.status === 400) {
    // 모달로직 들어올 예정
    setPasswordError('비밀번호가 일치하지 않습니다.');
    return;
  }
  setEmailError('존재하지 않는 유저입니다.');
  return;
};

export const signUpUser = async (formValues, setErrors, router) => {
  const res = await axiosPost('users', {
    email: formValues.email,
    password: formValues.password,
    nickname: formValues.nickname,
  });
  if (!res.status) {
    // 나중에 모달 로직 들어갈 예정
    alert('가입이 완료되었습니다.');
    router.push('/signin');
    return;
  }
  if (res.status === 409) {
    // 여기도 모달 대체 예정
    setErrors((prev) => ({ ...prev, emailError: res.data.message }));
    return;
  }
  return;
};
