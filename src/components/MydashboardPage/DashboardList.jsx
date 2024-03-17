import DashboardListItem from '../Buttons/DashboardListItem/DashboardListItem';
import PaginationButton from '../Buttons/PaginationButton/PaginationButton';

// TODO(송상훈) : 비어있음 div 이미지 추가
export default function DashboardList({
  dashboards,
  totalCount,
  prevPage,
  nextPage,
  currentPage,
}) {
  const totalPage = totalCount ? Math.ceil(totalCount / 6) : 0;

  return (
    <section className="bg-white max-w-[1022px] h-auto rounded-[8px] shadow-sm py-[24px] px-[16px]">
      <h2 className="text-xl font-bold mb-5">대시보드 목록</h2>

      <div className="flex flex-col h-[388px] gap-y-2 md:grid md:grid-cols-2 gap-[10px] lg:grid-cols-3 md:h-[220px] lg:h-[148px]">
        {dashboards ? (
          dashboards.map((dashboard) => (
            <DashboardListItem
              key={dashboard.id}
              url="/"
              title={dashboard.title}
              color={dashboard.color}
              createdByMe={dashboard.createdByMe}
            />
          ))
        ) : (
          <div>대시보드가 비어있습니다</div>
        )}
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
    </section>
  );
}
