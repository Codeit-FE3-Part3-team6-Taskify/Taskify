import DashboardListItem from '../Buttons/DashboardListItem/DashboardListItem';
import PaginationButton from '../Buttons/PageinationButton/PaginationButton';

export default function DashboardList({ dashboards }) {
  return (
    <section className="bg-white max-w-[1022px] h-auto rounded-[8px] shadow-sm py-[24px] px-[16px]">
      <h2 className="text-xl font-bold mb-5">대시보드 목록</h2>

      <div className="flex flex-col gap-y-2 md:grid md:grid-cols-2 gap-[10px] lg:grid-cols-3">
        {dashboards.map((dashboard) => (
          <DashboardListItem
            key={dashboard.id}
            url="/"
            title={dashboard.title}
            color={dashboard.color}
            createdByMe={dashboard.createdByMe}
          />
        ))}
      </div>

      <div className="flex justify-end items-center mt-6">
        <span>
          `${null}페이지 중 ${null}`
        </span>
        <PaginationButton direction="prev" />
        <PaginationButton />
      </div>
    </section>
  );
}
