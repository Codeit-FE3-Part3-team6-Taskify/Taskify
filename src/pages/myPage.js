import Sidebar from '@/components/Sidebar/Sidebar';
import MyPageContent from '@/components/MyPageContent/MyPageContent';

// TODO(조예진) : 미완성 - 이미지업로드/수정, 닉네임 수정, 비밀번호 수정 기능 추가,
export default function MyPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <MyPageContent />
      </div>
    </div>
  );
}
