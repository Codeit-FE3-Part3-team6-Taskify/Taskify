import React from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import Sidebar from '@/components/common/Sidebar/Sidebar';

export default function DashboardPage() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div className="flex ">
      <aside>
        <Sidebar dashboards={null} />
      </aside>
      <div className="flex flex-col w-full">
        <header>
          <DashboardHeader title="내 대시보드" userInfo={userInfo} />
        </header>
        <main className="bg-gray_FAFAFA h-full w-full flex flex-col gap-y-16 p-[24px] md:p-[40px]">
          내용추가
        </main>
      </div>
    </div>
  );
}
