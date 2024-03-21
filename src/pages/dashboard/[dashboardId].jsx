/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Image from 'next/image';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import useUserGet from '@/hooks/useUserGet';
import { CrownIcon } from '@/../public/images';
import useDashboardInfo from '@/hooks/useDashboardInfo';
import DashboardColumn from '@/components/Dashboard/DashboardColumn/DashboardColumn';
import CtaAdd from '@/components/common/Buttons/CtaAdd/CtaAdd';
import useGetDashboardsSidebar from '@/hooks/useGetDashboardsSidebar';
import useDashboardUtilityFunctions from '@/hooks/useDashboardUtilityFunctions';
import DashboardHeaderButton from '@/components/Dashboard/DashboardHeaderButton/DashboardHeaderButton';

export async function getServerSideProps(context) {
  const { dashboardId } = context.params;

  return {
    props: {
      dashboardId: +dashboardId,
    },
  };
}

export default function DashboardPage({ dashboardId }) {
  const userInfo = useUserGet();
  const { sidebarNextPage, sidebarPrevPage, sidebarCurrentPage } =
    useGetDashboardsSidebar();

  const { dashboardInfo, memberList, columns } = useDashboardInfo(dashboardId);
  const {
    onDragEnd,
    handleOpenInvitation,
    handleOpenAddColumnsModal,
    openModal,
  } = useDashboardUtilityFunctions(dashboardId, columns);

  return (
    <div className="flex w-screen">
      <aside>
        <Sidebar
          sidebarNextPage={sidebarNextPage}
          sidebarPrevPage={sidebarPrevPage}
          sidebarCurrentPage={sidebarCurrentPage}
        />
      </aside>
      <div className="flex flex-col w-5/6 ">
        <header>
          <DashboardHeader
            divider
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
              <DashboardHeaderButton invitationClick={handleOpenInvitation} />
            }
          />
        </header>
        <main className="bg-gray_FAFAFA h-full w-full flex flex-col gap-y-16 p-[24px] md:p-[40px] flex-auto  ">
          <div className="flex flex-col gap-[30px] md:gap-10 lg:flex-row lg:overflow-x-scroll lg:pb-20 lg:h-[80vh] ">
            <DragDropContext onDragEnd={onDragEnd}>
              {columns &&
                columns.map((column) => (
                  <DashboardColumn
                    {...column}
                    dashboardId={dashboardId}
                    openModal={openModal}
                    key={column.id}
                  />
                ))}
            </DragDropContext>
            <div className=" lg:min-w-[354px] lg:mt-7">
              <CtaAdd onClick={handleOpenAddColumnsModal} size="large">
                새로운 컬럼 추가하기
              </CtaAdd>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
