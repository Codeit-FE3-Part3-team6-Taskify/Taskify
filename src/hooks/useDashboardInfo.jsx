import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { axiosGet } from '@/features/axios';
import { setMembers } from '@/features/memberSlice';
import { reset, setColumn } from '@/features/columnsSlice';
import { setDashboardInfo } from '@/features/dashboardInfoSlice';

export default function useDashboardInfo(dashboardId) {
  const dashboardInfo = useSelector((state) => state.dashboardInfo);
  const memberList = useSelector((state) => state.memberList.members);
  const columns = useSelector((state) => state.columnList);
  const dispatch = useDispatch();
  const router = useRouter();

  const getDashboardInfo = async () => {
    const res = await axiosGet(`/dashboards/${dashboardId}`);
    if (res.status) {
      router.push('/mydashboard');
      return;
    }
    dispatch(setDashboardInfo({ data: res }));
  };
  const getMemberList = async () => {
    const res = await axiosGet(
      `members?page=1&size=20&dashboardId=${dashboardId}`,
    );
    if (res.status) {
      return;
    }
    dispatch(setMembers({ members: res.members, totalCount: res.totalCount }));
  };
  const getColumns = async () => {
    dispatch(reset());
    const res = await axiosGet(`columns?dashboardId=${dashboardId}`);
    if (res.status) {
      return;
    }
    dispatch(setColumn({ data: res.data }));
  };
  useEffect(() => {
    getDashboardInfo();
    getMemberList();
    getColumns();
  }, [dashboardId]);

  return { dashboardInfo, memberList, columns };
}
