import Image from 'next/image';
import DashboardHeader from '@/components/Header/DashboardHeader';
import TableBox from '@/components/Table/TableBox';

import { AddButtonFill, PaginationArrow } from '../../../public/images';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import UserInformationInput from '@/components/SignInput/UserInformationInput';

export default function MyPageContent() {
  // mock data
  const userInfo = { nickname: '곰도리', email: 'gomdoll@codeit.com' };

  return (
    <>
      <DashboardHeader hasSpace title="계정관리" userInfo={userInfo} />
      <div className="flex flex-col justify-start gap-3 py-[17px] px-3 md:p-5 bg-gray_FAFAFA flex-grow">
        <div className="flex items-center mb-[13px] gap-[6px]">
          <Image
            className="scale-x-[-1]"
            src={PaginationArrow}
            alt="back"
            width={20}
            height={20}
          />
          <span className="">돌아가기</span>
        </div>

        <TableBox>
          <div className="relative flex flex-col gap-4 md:gap-6">
            <div className="mb-2">프로필</div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-4">
              <div className="flex justify-center items-center w-[100px] h-[100px] md:w-[182px] md:h-[182px] rounded-[6px] bg-[#F5F5F5]">
                <Image src={AddButtonFill} alt="add" width={20} height={20} />
              </div>
              <div className="flex flex-col gap-4">
                <UserInformationInput labelName="이메일" />
                <UserInformationInput labelName="닉네임" />
              </div>
            </div>

            <div className="relative flex justify-end">
              <CtaDefault size="xsmall">저장</CtaDefault>
            </div>
          </div>
        </TableBox>

        <TableBox>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="mb-2">비밀번호 변경</div>
            <div className="flex flex-col gap-4">
              <div>현재 비밀번호</div>
              <UserInformationInput
                labelName="현재 비밀번호"
                placeholder="현재 비밀번호 입력"
              />
              <UserInformationInput
                labelName="새 비밀번호"
                placeholder="새 비밀번호 입력"
              />
              <UserInformationInput
                labelName="새 비밀번호 확인"
                placeholder="새 비밀번호 입력"
              />
            </div>
            <div className="relative flex justify-end">
              <CtaDefault size="xsmall">변경</CtaDefault>
            </div>
          </div>
        </TableBox>
      </div>
    </>
  );
}
