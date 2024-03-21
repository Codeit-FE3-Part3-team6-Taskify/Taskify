import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGet } from '@/features/axios';
import {
  setEmailCurrentPage,
  setEmails,
} from '@/features/invitedEmailListSlice';

const useGetInvitedEmails = (dashboardId) => {
  const emailCurrentPage = useSelector(
    (state) => state.invitedEmailList.emailCurrentPage,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet(
          `dashboards/${dashboardId}/invitations?page=${emailCurrentPage}&size=5`,
        );
        dispatch(
          setEmails({
            invitations: data.invitations,
            totalCount: data.totalCount,
          }),
        );
      } catch (catchError) {
        setError(catchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [emailCurrentPage, dispatch]);

  const nextPage = () => dispatch(setEmailCurrentPage(emailCurrentPage + 1));
  const prevPage = () =>
    dispatch(setEmailCurrentPage(Math.max(1, emailCurrentPage - 1)));

  return {
    loading,
    error,
    nextPage,
    prevPage,
    emailCurrentPage,
  };
};

export default useGetInvitedEmails;
