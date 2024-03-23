import Sidebar from '@/components/common/Sidebar/Sidebar';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import MyPageContent from '@/components/MyPage/MyPageContent/MyPageContent';
import useGetDashboardsSidebar from '@/hooks/useGetDashboardsSidebar';
import useUserGet from '@/hooks/useUserGet';

// TODO(조예진) : 완성.
export default function MyPage() {
  const userInfo = useUserGet();
  const { sidebarNextPage, sidebarPrevPage, sidebarCurrentPage } =
    useGetDashboardsSidebar();
  return (
    <div className="flex">
      <aside>
        <Sidebar
          sidebarNextPage={sidebarNextPage}
          sidebarPrevPage={sidebarPrevPage}
          sidebarCurrentPage={sidebarCurrentPage}
        />
      </aside>
      <div className="flex flex-col flex-grow">
        <DashboardHeader hasSpace title="계정관리" userInfo={userInfo} />
        <MyPageContent />
      </div>
    </div>
  );
}
