import Sidebar from '@/components/common/Sidebar/Sidebar';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import MyPageContent from '@/components/MyPage/MyPageContent/MyPageContent';
import useGetDashboardsSidebar from '@/hooks/useGetDashboardsSidebar';
import useUserGet from '@/hooks/useUserGet';
import useRedirectWithAccessToken from '@/hooks/useRedirectWithAccessToken';

// TODO(조예진) : 완성.
export default function MyPage() {
  useRedirectWithAccessToken();
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
