import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGet } from '@/features/axios';
import { setCurrentPage, setMembers } from '@/features/memberSlice';

const useGetdMember = (dashboardId) => {
  const currentPage = useSelector((state) => state.memberList.currentPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet(
          `members?page=${currentPage}&size=4&dashboardId=${dashboardId}`,
        );
        dispatch(
          setMembers({
            members: data.members,
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
  }, [currentPage, dispatch]);

  const nextPage = () => dispatch(setCurrentPage(currentPage + 1));
  const prevPage = () => dispatch(setCurrentPage(Math.max(1, currentPage - 1)));

  return {
    loading,
    error,
    nextPage,
    prevPage,
    currentPage,
  };
};

export default useGetdMember;
