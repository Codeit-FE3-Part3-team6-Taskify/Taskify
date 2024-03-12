import { axiosPost } from './axios';

export const signInUser = async (data) => {
  const res = await axiosPost('auth/login', data);
  console.log('로그인 성공');
  console.log(res);
};
