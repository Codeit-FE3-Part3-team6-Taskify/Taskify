import DashboardHeader from '@/components/Header/DashboardHeader';
import DashboardList from '@/components/MydashboardPage/DashboardList';
import InvitedDashboard from '@/components/MydashboardPage/InvitedDashboard';
import Sidebar from '@/components/Sidebar/Sidebar';
import { dashboards, invitations } from '@/utils/text';

const userInfo = { nickname: 'yejin', email: 'yejiniee@codeit.com' };

export default function myDashboard() {
  return (
    <div className="flex ">
      <aside>
        <Sidebar dashboards={dashboards} />
      </aside>
      <div className="flex flex-col w-full">
        <header>
          <DashboardHeader title="내 대시보드" userInfo={userInfo} />
        </header>
        <main className="bg-gray_FAFAFA h-full w-full flex flex-col gap-y-16 p-[24px] md:p-[40px]">
          <DashboardList dashboards={dashboards} />
          <InvitedDashboard invitations={invitations} />
        </main>
      </div>
    </div>
  );
}
