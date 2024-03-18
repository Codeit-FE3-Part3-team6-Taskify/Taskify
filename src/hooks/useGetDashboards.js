import { useState, useEffect } from 'react';
import { axiosGet } from '@/features/axios';

const useGetDashboards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboardsData, setDashboardsData] = useState({});
  const [allDashboardsData, setAllDashboardsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet(
          `/dashboards?navigationMethod=pagination&page=${currentPage}&size=6`,
        );
        const allData = await axiosGet(
          '/dashboards?navigationMethod=infiniteScroll',
        );
        setAllDashboardsData(allData.dashboards);
        setDashboardsData(data);
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
    allDashboardsData,
    loading,
    error,
    nextPage,
    prevPage,
    currentPage,
  };
};

export default useGetDashboards;
