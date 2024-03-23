import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { axiosGet } from '@/features/axios';
import {
  addInvitations,
  setInvitations,
} from '@/features/invitationsDashboardListSlice';

const useGetInvitedDashboards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursorId, setCursorId] = useState(null);
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await axiosGet(
          `/invitations?size=6${title ? `&title=${title}` : ''}`,
        );
        dispatch(setInvitations({ invitations: response.invitations }));
        setCursorId(response.cursorId);
      } catch (catchError) {
        setError(catchError);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [title, dispatch]);

  const fetchMore = async () => {
    if (cursorId === null) return; // cursorId가 null이면 추가 데이터 요청하지 않음

    setLoading(true);
    try {
      const response = await axiosGet(
        `/invitations?size=6&cursorId=${cursorId}${title ? `&title=${title}` : ''}`,
      );
      dispatch(addInvitations({ newInvitations: response.invitations }));
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
    loading,
    error,
    fetchMore,
    updateTitle,
  };
};

export default useGetInvitedDashboards;
