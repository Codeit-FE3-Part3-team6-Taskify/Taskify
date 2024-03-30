/* eslint-disable no-useless-return */
import { axiosPostJason } from './axios';
import { addUserInfo } from './userInfoSlice';

// Todo (노진석) : 나중에 모달넣기
export const signInUser = async ({ data, router, dispatch, openModal }) => {
  const res = await axiosPostJason('auth/login', data);
  if (!res.status) {
    const { user } = res;
    dispatch(addUserInfo(user));
    localStorage.setItem('accessToken', res.accessToken);
    router.push('/mydashboard');
    return;
  }
  let message = '';
  if (res.status === 400) {
    message = '비밀번호가 일치하지 않습니다.';
  } else {
    message = '존재하지 않는 이메일입니다.';
  }
  openModal({
    type: 'alert',
    props: { text: message },
  });
};

export const signUpUser = async ({
  formValues,
  setErrors,
  router,
  openModal,
}) => {
  const res = await axiosPostJason('users', {
    email: formValues.email,
    password: formValues.password,
    nickname: formValues.nickname,
  });
  if (!res.status) {
    openModal({
      type: 'alert',
      props: {
        text: '가입이 완료되었습니다!',
      },
    });
    router.push('/signin');
    return;
  }
  if (res.status === 409) {
    openModal({
      type: 'alert',
      props: { text: '이미 사용 중인 이메일입니다.' },
    });
    setErrors((prev) => ({ ...prev, emailError: res.data.message }));
  }
};
