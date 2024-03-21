import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Logo, LogoImg, AddButtonEmpty, CrownIcon } from '@/../public/images';
import PaginationButton from '../Buttons/PaginationButton/PaginationButton';
import { openModal } from '@/features/modalSlice';

export default function Sidebar({
  sidebarNextPage,
  sidebarPrevPage,
  sidebarCurrentPage,
}) {
  // 송상훈 Todo:
  const createCircle = (color) => {
    const circleStyle = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color,
    };

    return <div style={circleStyle} />;
  };

  const dashboards = useSelector(
    (state) => state.sidebarDashboardList.sidebarDashboards,
  );
  const totalCount = useSelector(
    (state) => state.sidebarDashboardList.sidebarTotalCount,
  );

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

      <div className="flex flex-col w-full items-center h-full mt-3 md:pl-6 md:items-start">
        <div className="h-[480px] lg:h-[560px]">
          {dashboards && dashboards.length > 0 ? (
            dashboards.map((dashboard) => (
              <div
                key={dashboard.id}
                className="flex items-center gap-x-2 h-12 lg:h-14"
              >
                {dashboard.color && createCircle(dashboard.color)}
                <p className="hidden truncate text-gray_787486 md:inline ml-2 md:text-sm lg:text-lg  md:max-w-[70px] lg:max-w-[170px]">
                  {dashboard.title}
                </p>
                {dashboard.createdByMe && (
                  <Image
                    className="hidden md:inline"
                    src={CrownIcon}
                    width={17.5}
                    height={14}
                    alt="왕관"
                  />
                )}
              </div>
            ))
          ) : (
            <div>
              <p>No</p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6 w-full">
          <PaginationButton
            direction="prev"
            onClick={sidebarPrevPage}
            disabled={sidebarCurrentPage === 1}
          />
          <PaginationButton
            direction="next"
            onClick={sidebarNextPage}
            disabled={sidebarCurrentPage >= Math.ceil(totalCount / 10)}
          />
        </div>
      </div>
    </div>
  );
}
