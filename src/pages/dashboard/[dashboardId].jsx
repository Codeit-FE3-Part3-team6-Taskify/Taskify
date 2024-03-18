import React from 'react';
import Image from 'next/image';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import useUserGet from '@/hooks/useUserGet';
import CtaIcon from '@/components/common/Buttons/CtaIcon/CtaIcon';
import { AddButtonEmpty, CrownIcon, SettingIcon } from '@/../public/images';
import useDashboardList from '@/hooks/useDashboardList';
import useDashboardInfo from '@/hooks/useDashboardInfo';
import DashboardColumn from '@/components/Dashboard/DashboardColumn/DashboardColumn';
import CtaAdd from '@/components/common/Buttons/CtaAdd/CtaAdd';

export async function getServerSideProps(context) {
  const { dashboardId } = context.params;

  return {
    props: {
      dashboardId,
    },
  };
}

export default function DashboardPage({ dashboardId }) {
  const userInfo = useUserGet();
  const { dashboardList } = useDashboardList();
  const { dashboardInfo, memberList, columns, setColumns } =
    useDashboardInfo(dashboardId);

  return (
    <div className="flex w-full ">
      <aside>
        <Sidebar dashboards={dashboardList} />
      </aside>
      <div className="flex flex-col w-5/6 ">
        <header>
          <DashboardHeader
            title={dashboardInfo ? dashboardInfo.title : ''}
            userInfo={userInfo}
            participants={memberList}
            ownerIcon={
              dashboardInfo && dashboardInfo.createdByMe ? (
                <Image
                  height={16}
                  width={20}
                  src={CrownIcon}
                  alt="왕관이미지"
                />
              ) : null
            }
            buttons={
              // 기능 넣기
              <div className="flex gap-[16px]">
                <CtaIcon imageSrc={SettingIcon}>관리</CtaIcon>
                <CtaIcon imageSrc={AddButtonEmpty}>초대하기</CtaIcon>
              </div>
            }
          />
        </header>
        <main className="bg-gray_FAFAFA h-full w-full flex flex-col gap-y-16 p-[24px] md:p-[40px] flex-auto  ">
          <div className="flex flex-col gap-[30px] md:gap-10 lg:flex-row lg:overflow-x-auto lg:pb-20 lg:h-screen ">
            {columns &&
              columns.map((column) => (
                // eslint-disable-next-line react/self-closing-comp
                <DashboardColumn
                  setColumns={setColumns}
                  {...column}
                  key={column.id}
                ></DashboardColumn>
              ))}
            <div className=" lg:min-w-[354px] lg:mt-7">
              <CtaAdd size="large">새로운 컬럼 추가하기</CtaAdd>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
