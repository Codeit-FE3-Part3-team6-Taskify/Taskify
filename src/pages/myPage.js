import Sidebar from '@/components/Sidebar/Sidebar';
import DashboardHeader from '@/components/Header/DashboardHeader';
import MyPageContent from '@/components/MyPage/MyPageContent/MyPageContent';

// TODO(조예진) : 완성
export default function MyPage() {
  // mock data
  const userInfo = { nickname: '곰도리', email: 'gomdoll@codeit.com' };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <DashboardHeader hasSpace title="계정관리" userInfo={userInfo} />
        <MyPageContent />
      </div>
    </div>
  );
}
