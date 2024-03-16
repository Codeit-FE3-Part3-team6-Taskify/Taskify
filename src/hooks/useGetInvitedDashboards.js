import { useState, useEffect } from 'react';
import { axiosGet } from '@/features/axios';

const useGetInvitedDashboards = () => {
  const [invitedDashboardData, setInvitedDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet('/invitations');
        setInvitedDashboardData(data);
      } catch (catchError) {
        setError(catchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { invitedDashboardData, loading, error };
};

export default useGetInvitedDashboards;
