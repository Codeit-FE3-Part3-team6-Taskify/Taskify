import Image from 'next/image';
import Link from 'next/link';
import { PaginationArrow } from '@/../public/images';
import DashboardEditPanel from './DashboardEditPanel';
import MemberListEdit from './MemberListEdit';
import InvitedEmailList from './InvitedEmailList';
import DashboardDelete from '@/components/common/Buttons/DashboardDelete/DashboardDelete';

export default function EditContent({ dashboardId, dashboardInfo }) {
  return (
    <>
      <Link
        href={`/dashboard/${dashboardId}`}
        className="flex items-center mb-[13px] gap-[6px] "
      >
        <span className="relative w-5 h-5">
          <Image
            fill
            className="scale-x-[-1]"
            src={PaginationArrow}
            alt="back"
          />
        </span>
        <span className="text-sm md:text-base font-medium">돌아가기</span>
      </Link>
      <DashboardEditPanel
        dashboardId={dashboardId}
        dashboardInfo={dashboardInfo}
      />
      <MemberListEdit dashboardId={dashboardId} />
      <InvitedEmailList dashboardId={dashboardId} />
      <DashboardDelete />
    </>
  );
}
