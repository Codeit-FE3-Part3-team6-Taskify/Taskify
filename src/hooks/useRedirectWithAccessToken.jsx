import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRedirectWithAccessToken(url) {
  if (typeof window === 'undefined') {
    return;
  }
  const token = localStorage.getItem('accessToken');
  const router = useRouter();
  const execute = () => {
    if (!token) {
      if (url) {
        return;
      }
      router.push('/signin');
      return;
    }
    if (url) {
      router.push(url);
    }
  };

  useEffect(() => {
    execute();
  }, [token]);
}
