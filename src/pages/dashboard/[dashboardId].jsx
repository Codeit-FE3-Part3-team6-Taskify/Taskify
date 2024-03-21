/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Image from 'next/image';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import useUserGet from '@/hooks/useUserGet';
import CtaIcon from '@/components/common/Buttons/CtaIcon/CtaIcon';
import { AddButtonEmpty, CrownIcon, SettingIcon } from '@/../public/images';
import useDashboardInfo from '@/hooks/useDashboardInfo';
import DashboardColumn from '@/components/Dashboard/DashboardColumn/DashboardColumn';
import CtaAdd from '@/components/common/Buttons/CtaAdd/CtaAdd';
import useModal from '@/hooks/useModal';
import { changeCard, deleteCard, plusCount } from '@/features/columnsSlice';
import { axiosPut } from '@/features/axios';
import useGetDashboardsSidebar from '@/hooks/ useGetDashboardsSidebar';

export async function getServerSideProps(context) {
  const { dashboardId } = context.params;

  return {
    props: {
      dashboardId: +dashboardId,
    },
  };
}

export default function DashboardPage({ dashboardId }) {
  const { openModal } = useModal();
  const userInfo = useUserGet();
  const { sidebarNextPage, sidebarPrevPage, sidebarCurrentPage } =
    useGetDashboardsSidebar();

  const { dashboardInfo, memberList, columns, dispatch } =
    useDashboardInfo(dashboardId);

  const handleOpenAddColumnsModal = () => {
    openModal({
      type: 'createColumn',
      props: {
        dashboardId,
      },
    });
  };
  const handleOpenInvitation = () => {
    openModal({
      type: 'inviteDashboard',
      props: {
        dashboardId,
      },
    });
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const dragColumnIndex = columns.findIndex(
      (column) => column.id === +source.droppableId,
    );
    const findCard = columns[dragColumnIndex].cardList.find(
      (card) => card.id === +draggableId,
    );
    dispatch(
      deleteCard({
        columnId: +source.droppableId,
        id: findCard.id,
      }),
    );
    dispatch(
      plusCount({
        count: -1,
        columnId: +source.droppableId,
      }),
    );
    const body = {
      ...findCard,
      columnId: +destination.droppableId,
    };
    dispatch(
      changeCard({
        data: body,
        columnId: +source.droppableId,
        id: findCard.id,
        index: destination.index,
      }),
    );
    dispatch(
      plusCount({
        count: 1,
        columnId: +destination.droppableId,
      }),
    );
    await axiosPut(`cards/${findCard.id}`, body);
  };

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
              // 기능 넣기
              <div className="flex gap-[16px]">
                <CtaIcon imageSrc={SettingIcon}>관리</CtaIcon>
                <CtaIcon
                  onClick={handleOpenInvitation}
                  imageSrc={AddButtonEmpty}
                >
                  초대하기
                </CtaIcon>
              </div>
            }
          />
        </header>
        <main className="bg-gray_FAFAFA h-full w-full flex flex-col gap-y-16 p-[24px] md:p-[40px] flex-auto  ">
          <div className="flex flex-col gap-[30px] md:gap-10 lg:flex-row lg:overflow-x-scroll lg:pb-20 lg:h-[80vh] ">
            <DragDropContext onDragEnd={onDragEnd}>
              {columns &&
                columns.map((column) => (
                  // eslint-disable-next-line react/self-closing-comp
                  <DashboardColumn
                    {...column}
                    dashboardId={dashboardId}
                    openModal={openModal}
                    key={column.id}
                  ></DashboardColumn>
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
