import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { AddButtonEmpty, NoMailIcon } from '@/../public/images';
import DashboardListItem from '../../common/Buttons/DashboardListItem/DashboardListItem';
import PaginationButton from '../../common/Buttons/PaginationButton/PaginationButton';
import { openModal } from '@/features/modalSlice';

// Todo(송상훈):
export default function DashboardList({ prevPage, nextPage, currentPage }) {
  const dashboards = useSelector((state) => state.dashboardList.dashboards);
  const totalCount = useSelector((state) => state.dashboardList.totalCount);

  const totalPage = totalCount ? Math.ceil(totalCount / 6) : 0;
  const isEmpty = !dashboards || dashboards.length === 0;

  const dispatch = useDispatch();

  const handleOpenCreateDashboardModal = () => {
    dispatch(openModal({ type: 'createDashboard' }));
  };

  return (
    <section className="bg-white max-w-[1022px] h-auto rounded-[8px] shadow-sm py-[24px] px-[16px]">
      <div className="flex justify-between mb-5">
        <h2 className="text-xl font-bold">대시보드 목록</h2>
        <button
          className="flex items-center gap-2 h-[28px] md:border p-4 rounded"
          type="button"
          onClick={handleOpenCreateDashboardModal}
        >
          <span className="hidden text-sm  md:block">새로운 대시보드</span>
          <Image width={25} height={25} src={AddButtonEmpty} alt="더하기버튼" />
        </button>
      </div>

      {isEmpty ? (
        <div className="h-[200px] flex flex-col justify-center items-center">
          <Image
            src={NoMailIcon}
            width={100}
            height={100}
            alt="대시보드 없음"
          />
          <p className="text-gray_9FA6B2 mt-6">아직 대시보드가 없어요</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col h-[388px] gap-y-2 md:grid md:grid-cols-2 gap-[10px] lg:grid-cols-3 md:h-[220px] lg:h-[148px]">
            {dashboards.map((dashboard) => (
              <DashboardListItem
                key={dashboard.id}
                url="/"
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
                id={dashboard.id}
              />
            ))}
          </div>

          <div className="flex justify-end items-center mt-6">
            <span>
              {totalPage} 페이지 중 {currentPage}
            </span>
            <PaginationButton
              direction="prev"
              onClick={prevPage}
              disabled={currentPage === 1}
            />
            <PaginationButton
              direction="next"
              onClick={nextPage}
              disabled={currentPage >= Math.ceil(totalCount / 6)}
            />
          </div>
        </>
      )}
    </section>
  );
}
