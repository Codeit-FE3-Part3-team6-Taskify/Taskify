import { useState } from 'react';
import { axiosPut } from '@/features/axios';
import TableBox from '../Table/TableBox';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import UserInformationInput from '@/components/SignInput/UserInformationInput';

export default function UpdatePassword() {
  return (
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
  );
}
