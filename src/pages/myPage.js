import Sidebar from '@/components/Sidebar/Sidebar';
import DashboardHeader from '@/components/Header/DashboardHeader';
import MyPageContent from '@/components/MyPageContent/MyPageContent';

// TODO(조예진) : 미완성 - 이미지업로드/수정, 닉네임 수정, 비밀번호 수정 기능 추가,
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
