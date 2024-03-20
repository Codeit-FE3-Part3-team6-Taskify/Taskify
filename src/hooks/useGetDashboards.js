import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGet } from '@/features/axios';
import { setCurrentPage, setDashboards } from '@/features/dashboardListSlice';

const useGetDashboards = () => {
  const currentPage = useSelector((state) => state.dashboardList.currentPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet(
          `/dashboards?navigationMethod=pagination&page=${currentPage}&size=6`,
        );
        dispatch(
          setDashboards({
            dashboards: data.dashboards,
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

export default useGetDashboards;
