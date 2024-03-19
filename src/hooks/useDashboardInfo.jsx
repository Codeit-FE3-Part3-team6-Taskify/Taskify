import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { axiosGet } from '@/features/axios';
import { setMembers } from '@/features/memberSlice';
import { setColumn } from '@/features/columnsSlice';

export default function useDashboardInfo(dashboardId) {
  const [dashboardInfo, setDashboardInfo] = useState();
  const memberList = useSelector((state) => state.memberList.members);
  const columns = useSelector((state) => state.columnList);
  const dispatch = useDispatch();

  const getDashboardInfo = async () => {
    const res = await axiosGet(`/dashboards/${dashboardId}`);
    setDashboardInfo(res);
  };
  const getMemberList = async () => {
    const res = await axiosGet(
      `members?page=1&size=20&dashboardId=${dashboardId}`,
    );
    dispatch(setMembers({ members: res.members, totalCount: res.totalCount }));
  };
  const getColumns = async () => {
    const res = await axiosGet(`columns?dashboardId=${dashboardId}`);
    dispatch(setColumn({ data: res.data }));
  };
  useEffect(() => {
    getDashboardInfo();
    getMemberList();
    getColumns();
  }, []);

  return { dashboardInfo, memberList, columns };
}
