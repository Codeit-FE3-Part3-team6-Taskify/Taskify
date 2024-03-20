import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRedirectWithAccessToken() {
  if (typeof window === 'undefined') {
    return;
  }
  const token = localStorage.getItem('accessToken');
  const router = useRouter();
  const execute = () => {
    if (!token) {
      return;
    }
    router.push('/mydashboard');
  };

  useEffect(() => {
    execute();
  }, [token]);
}