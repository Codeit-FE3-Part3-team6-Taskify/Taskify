import Image from 'next/image';
import DashboardHeader from '@/components/Header/DashboardHeader';
import TableBox from '@/components/TableBox';

import { AddButtonFill } from '../../public/images';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';

export default function MyPage() {
  // mock data
  const userInfo = { nickname: '곰도리', email: 'gomdoll@codeit.com' };

  return (
    <div className="flex">
      <div>대시보드</div>
      <div className="flex flex-col flex-grow">
        <DashboardHeader hasSpace title="계정관리" userInfo={userInfo} />
        <div className="py-[17px] px-3 bg-gray_FAFAFA">
          <div> &lt; 돌아가기 </div>
          <TableBox>
            <div className="relative flex flex-col gap-4 md:gap-6">
              <div className="mb-2">프로필</div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                <div className="flex justify-center items-center w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-[6px] bg-[#F5F5F5]">
                  <Image src={AddButtonFill} alt="add" width={20} height={20} />
                </div>
                <div className="flex flex-col gap-4">
                  <div>이메일</div>
                  <div>닉네임</div>
                </div>
              </div>

              <div className="relative flex justify-end">
                <CtaDefault size="small">저장</CtaDefault>
              </div>
            </div>
          </TableBox>
          <TableBox>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="mb-2">비밀번호 변경</div>
              <div className="flex flex-col gap-4">
                <div>현재 비밀번호</div>
                <div>새 비밀번호</div>
                <div>새 비밀번호 확인</div>
              </div>
              <div className="relative flex justify-end">
                <CtaDefault size="small">변경</CtaDefault>
              </div>
            </div>
          </TableBox>
        </div>
      </div>
    </div>
  );
}
