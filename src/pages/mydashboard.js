import DashboardHeader from '@/components/Header/DashboardHeader';
import DashboardList from '@/components/MydashboardPage/DashboardList';
import InvitedDashboard from '@/components/MydashboardPage/InvitedDashboard';
import Sidebar from '@/components/Sidebar/Sidebar';
import useGetDashboards from '@/hooks/useGetDashboards';
import useGetInvitedDashboards from '@/hooks/useGetInvitedDashboards';
import useGetUsers from '@/hooks/useGetUsers';

export default function myDashboard() {
  const { userData } = useGetUsers();
  const { dashboardsData, allDashboardsData, nextPage, prevPage, currentPage } =
    useGetDashboards();
  const { invitedDashboardData, loading, fetchMore } =
    useGetInvitedDashboards();

  return (
    <div className="flex ">
      <aside>
        <Sidebar dashboards={allDashboardsData} />
      </aside>
      <div className="flex flex-col w-full">
        <DashboardHeader title="내 대시보드" userInfo={userData} />
        <main className="bg-gray_FAFAFA h-full w-full p-[24px] md:p-[40px]">
          <div className="flex flex-col gap-y-16">
            <DashboardList
              dashboards={dashboardsData.dashboards}
              totalCount={dashboardsData.totalCount}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
            />
            <InvitedDashboard
              invitations={invitedDashboardData}
              loading={loading}
              fetchMore={fetchMore}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
