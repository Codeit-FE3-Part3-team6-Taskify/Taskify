import DashboardHeader from '@/components/common/Header/DashboardHeader';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import DashboardList from '@/components/MydashboardPage/DashboardList/DashboardList';
import InvitedDashboard from '@/components/MydashboardPage/InvitedDashboard/InvitedDashboard';
import useGetDashboardsSidebar from '@/hooks/ useGetDashboardsSidebar';
import useGetDashboards from '@/hooks/useGetDashboards';
import useGetInvitedDashboards from '@/hooks/useGetInvitedDashboards';
import useGetUsers from '@/hooks/useGetUsers';

export default function myDashboard() {
  const { userData } = useGetUsers();
  const { nextPage, prevPage, currentPage } = useGetDashboards();
  const { sidebarNextPage, sidebarPrevPage, sidebarCurrentPage } =
    useGetDashboardsSidebar();
  const { loading, fetchMore, updateTitle } = useGetInvitedDashboards();

  return (
    <div className="flex ">
      <aside>
        <Sidebar
          sidebarNextPage={sidebarNextPage}
          sidebarPrevPage={sidebarPrevPage}
          sidebarCurrentPage={sidebarCurrentPage}
        />
      </aside>
      <div className="flex flex-col w-full min-h-screen">
        <DashboardHeader title="내 대시보드" userInfo={userData} />
        <main className="bg-gray_FAFAFA flex-1 w-full p-[24px] md:p-[40px]">
          <div className="flex flex-col gap-y-16">
            <DashboardList
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
            />
            <InvitedDashboard
              loading={loading}
              fetchMore={fetchMore}
              updateTitle={updateTitle}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
