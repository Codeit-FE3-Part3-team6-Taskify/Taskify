import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Logo, LogoImg, AddButtonEmpty } from '@/../public/images';
import PaginationButton from '../Buttons/PaginationButton/PaginationButton';
import { openModal } from '@/features/modalSlice';
import SidebarDashboardListItem from './SidebarDashboardListItem/SidebarDashboardListItem';

export default function Sidebar({
  sidebarNextPage,
  sidebarPrevPage,
  sidebarCurrentPage,
}) {
  const dashboards = useSelector(
    (state) => state.sidebarDashboardList.sidebarDashboards,
  );
  const totalCount = useSelector(
    (state) => state.sidebarDashboardList.sidebarTotalCount,
  );

  const isEmpty = !dashboards || dashboards.length === 0;

  const dispatch = useDispatch();

  const handleOpenCreateDashboardModal = () => {
    dispatch(openModal({ type: 'createDashboard' }));
  };

  return (
    <div className="flex flex-col border-r bg-white items-center h-full pt-5 w-[67px] md:w-[160px] lg:w-[300px]">
      <Link href="/" className="flex flex-row md:w-full mb-9 md:mb-14 md:pl-6">
        <Image src={LogoImg} width={29} height={33} alt="로고이미지" />
        <Image
          className="hidden md:inline"
          src={Logo}
          width={80}
          height={22}
          alt="로고"
        />
      </Link>

      <div className="flex md:w-full md:justify-between md:px-6">
        <p className="text-gray_787486 text-[12px] font-bold hidden md:inline ">
          Dash Boards
        </p>
        <button type="button" onClick={handleOpenCreateDashboardModal}>
          <Image
            src={AddButtonEmpty}
            width={20}
            height={20}
            alt="더하기 버튼"
          />
        </button>
      </div>

      {isEmpty ? (
        <div>No</div>
      ) : (
        <>
          <div className="flex flex-col items-center mt-8 w-full md:items-start">
            {dashboards.map((dashboard) => (
              <SidebarDashboardListItem
                key={dashboard.id}
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
                id={dashboard.id}
              />
            ))}
          </div>

          <div className="flex justify-between mt-10 px-1 w-full md:px-[24px]">
            <PaginationButton
              direction="prev"
              onClick={sidebarPrevPage}
              disabled={sidebarCurrentPage === 1}
              borderHide="yes"
            />
            <PaginationButton
              direction="next"
              onClick={sidebarNextPage}
              disabled={sidebarCurrentPage >= Math.ceil(totalCount / 10)}
              borderHide="yes"
            />
          </div>
        </>
      )}
    </div>
  );
}
