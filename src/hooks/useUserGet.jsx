import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGet } from '@/features/axios';
import { addUserInfo } from '@/features/userInfoSlice';

export default function useUserGet() {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  if (typeof window === 'undefined') {
    return userInfo;
  }
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    router.push('/signin');
    // eslint-disable-next-line consistent-return
    return;
  }
  const getUser = async () => {
    const res = await axiosGet('/users/me');
    dispatch(addUserInfo(res));
  };

  useEffect(() => {
    getUser();
  }, [accessToken]);

  return userInfo;
}
