import { useEffect, useState } from 'react';
import { axiosGet } from '@/features/axios';

export default function useDashboardInfo(dashboardId) {
  const [dashboardInfo, setDashboardInfo] = useState();
  const [memberList, setMemberList] = useState();
  const [columns, setColumns] = useState();

  const getDashboardInfo = async () => {
    const res = await axiosGet(`/dashboards/${dashboardId}`);
    setDashboardInfo(res);
  };
  const getMemberList = async () => {
    const res = await axiosGet(
      `members?page=1&size=20&dashboardId=${dashboardId}`,
    );
    setMemberList(res.members);
  };
  const getColumns = async () => {
    const res = await axiosGet(`columns?dashboardId=${dashboardId}`);
    setColumns(res.data);
  };
  useEffect(() => {
    getDashboardInfo();
    getMemberList();
    getColumns();
  }, []);

  return { dashboardInfo, memberList, columns, setColumns };
}
