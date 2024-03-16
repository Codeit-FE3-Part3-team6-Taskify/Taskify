import { useState, useEffect } from 'react';
import { axiosGet } from '@/features/axios';

const useGetUsers = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet('/users/me');
        setUserData(data);
      } catch (catchError) {
        setError(catchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, loading, error };
};

export default useGetUsers;
