import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { axiosGet } from '@/features/axios';
import {
  setSidebarCurrentPage,
  setSidebarDashboards,
} from '@/features/sidebarDashboardListSlice';

const useGetDashboardsSidebar = () => {
  const currentPage = useSelector(
    (state) => state.sidebarDashboardList.sidebarCurrentPage,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet(
          `/dashboards?navigationMethod=pagination&page=${currentPage}&size=10`,
        );
        dispatch(
          setSidebarDashboards({
            sidebarDashboards: data.dashboards,
            totalCount: data.totalCount,
          }),
        );
        console.log(data.dashboards);
      } catch (catchError) {
        setError(catchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, dispatch]);

  const sidebarNextPage = () =>
    dispatch(setSidebarCurrentPage(currentPage + 1));
  const sidebarPrevPage = () =>
    dispatch(setSidebarCurrentPage(Math.max(1, currentPage - 1)));

  return {
    loading,
    error,
    sidebarNextPage,
    sidebarPrevPage,
  };
};

export default useGetDashboardsSidebar;
