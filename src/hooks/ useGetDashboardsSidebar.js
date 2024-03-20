import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { axiosGet } from '@/features/axios';
import {
  setSidebarCurrentPage,
  setSidebarDashboards,
} from '@/features/sidebarDashboardListSlice';

const useGetDashboardsSidebar = () => {
  const sidebarCurrentPage = useSelector(
    (state) => state.sidebarDashboardList.sidebarCurrentPage,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosGet(
          `/dashboards?navigationMethod=pagination&page=${sidebarCurrentPage}&size=10`,
        );
        dispatch(
          setSidebarDashboards({
            sidebarDashboards: data.dashboards,
            sidebarTotalCount: data.totalCount,
          }),
        );
      } catch (catchError) {
        setError(catchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sidebarCurrentPage, dispatch]);

  const sidebarNextPage = () =>
    dispatch(setSidebarCurrentPage(sidebarCurrentPage + 1));
  const sidebarPrevPage = () =>
    dispatch(setSidebarCurrentPage(Math.max(1, sidebarCurrentPage - 1)));

  return {
    loading,
    error,
    sidebarNextPage,
    sidebarPrevPage,
    sidebarCurrentPage,
  };
};

export default useGetDashboardsSidebar;
