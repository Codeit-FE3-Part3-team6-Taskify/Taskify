import { useEffect, useState } from 'react';
import { axiosGet } from '@/features/axios';

export default function useDashboardList() {
  const [dashboardList, setDashboardList] = useState();

  const getDashboard = async () => {
    const res = await axiosGet(
      `/dashboards?navigationMethod=infiniteScroll&page=1&size=10`,
    );
    setDashboardList(res.dashboards);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return { dashboardList, setDashboardList };
}
