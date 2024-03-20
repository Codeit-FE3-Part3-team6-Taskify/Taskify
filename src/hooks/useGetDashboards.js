import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { axiosGet } from '@/features/axios';
import { setDashboards } from '@/features/dashboardListSlice';

const useGetDashboards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboardsData, setDashboardsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet(
          `/dashboards?navigationMethod=pagination&page=${currentPage}&size=6`,
        );
        setDashboardsData(data);
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
  }, [currentPage]);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  return {
    dashboardsData,
    loading,
    error,
    nextPage,
    prevPage,
    currentPage,
  };
};

export default useGetDashboards;
