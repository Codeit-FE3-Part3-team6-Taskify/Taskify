import { useState, useEffect } from 'react';
import { axiosGet } from '@/features/axios';

const useGetInvitedDashboards = () => {
  const [invitedDashboardData, setInvitedDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursorId, setCursorId] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await axiosGet(
          `/invitations?size=6${title ? `&title=${title}` : ''}`,
        );
        setInvitedDashboardData(response.invitations || []);
        setCursorId(response.cursorId);
      } catch (catchError) {
        setError(catchError);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [title]);

  const fetchMore = async () => {
    if (cursorId === null) return; // cursorId가 null이면 추가 데이터 요청하지 않음

    setLoading(true);
    try {
      const response = await axiosGet(
        `/invitations?size=6&cursorId=${cursorId}${title ? `&title=${title}` : ''}`,
      );
      setInvitedDashboardData((prevData) => [
        ...prevData,
        ...(response.invitations || []),
      ]);
      setCursorId(response.cursorId);
    } catch (catchError) {
      setError(catchError);
    } finally {
      setLoading(false);
    }
  };

  const updateTitle = (newTitle) => {
    setTitle(newTitle);
  };

  return {
    cursorId,
    invitedDashboardData,
    loading,
    error,
    fetchMore,
    updateTitle,
  };
};

export default useGetInvitedDashboards;
