/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import useUserGet from '@/hooks/useUserGet';
import CtaIcon from '@/components/common/Buttons/CtaIcon/CtaIcon';
import { AddButtonEmpty, CrownIcon } from '@/../public/images';
import useDashboardInfo from '@/hooks/useDashboardInfo';
import useModal from '@/hooks/useModal';
import useGetDashboardsSidebar from '@/hooks/useGetDashboardsSidebar';
import EditContent from '@/components/DashboardEdit/EditContent/EditContent';
import useRedirectWithAccessToken from '@/hooks/useRedirectWithAccessToken';

export async function getServerSideProps(context) {
  const { dashboardId } = context.params;

  return {
    props: {
      dashboardId: +dashboardId,
    },
  };
}

export default function DashboardEdit({ dashboardId }) {
  useRedirectWithAccessToken();
  const { openModal } = useModal();
  const userInfo = useUserGet();
  const { sidebarNextPage, sidebarPrevPage, sidebarCurrentPage } =
    useGetDashboardsSidebar();

  const { dashboardInfo, memberList } = useDashboardInfo(dashboardId);

  const handleOpenInvitation = () => {
    openModal({
      type: 'inviteDashboard',
      props: {
        dashboardId,
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar
        sidebarNextPage={sidebarNextPage}
        sidebarPrevPage={sidebarPrevPage}
        sidebarCurrentPage={sidebarCurrentPage}
      />
      <div className="flex flex-col flex-grow">
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
        {dashboardInfo ? (
          <div className="flex flex-col justify-start gap-3 py-[17px] px-3 md:p-5 bg-gray_FAFAFA flex-grow">
            <EditContent dashboardId={dashboardId} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
