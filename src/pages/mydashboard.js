import Image from 'next/image';
import DashboardListItem from '@/components/Buttons/DashboardListItem/DashboardListItem';
import PaginationButton from '@/components/Buttons/PageinationButton/PaginationButton';
import DashboardHeader from '@/components/Header/DashboardHeader';
import Sidebar from '@/components/Sidebar/Sidebar';
import { dashboards, invitations } from '@/utils/text';
import { SearchIcon } from '../../public/images';
import CtaDefault from '../components/Buttons/CtaDefault/CtaDefault';

const userInfo = { nickname: 'yejin', email: 'yejiniee@codeit.com' };

export default function myDashboard() {
  return (
    <div className="flex ">
      <aside>
        <Sidebar dashboards={dashboards} />
      </aside>
      <div className="flex flex-col w-full">
        <DashboardHeader title="내 대시보드" userInfo={userInfo} />
        <main className="bg-gray_FAFAFA h-full w-full p-[24px] md:p-[40px]">
          <div className="flex flex-col gap-y-16">
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
            <section className="bg-white max-w-[1022px] h-auto rounded-[8px] shadow-sm py-[24px] px-[16px]">
              <h2 className="text-xl font-bold mb-5 ">초대받은 대시보드</h2>

              <div className="flex items-center mb-[24px]">
                <div className="relative w-full ">
                  <input
                    className="w-full rounded-[6px] border-2 h-[40px] pl-10"
                    type="text"
                    placeholder="Search"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Image
                      src={SearchIcon}
                      width={24}
                      height={24}
                      alt="돋보기아이콘"
                    />
                  </div>
                </div>
              </div>

              <div className="hidden md:text-gray_9FA6B2 md:grid md:grid-cols-3 ">
                <p>이름</p>
                <p>초대자</p>
                <p>수락 여부</p>
              </div>

              <div className="flex flex-col gap-y-2 h-[400px] overflow-y-scroll rounded-[8px]">
                {invitations.map((invitation) => (
                  <div className="flex flex-col border-b pb-[20px] gap-y-2 md:flex-row md:items-center md:grid md:grid-cols-3 md:pt-[20px] ">
                    <div className="flex">
                      <p className="w-[60px] text-gray_9FA6B2 md:hidden lg:hidden">
                        이름
                      </p>
                      <span>{invitation.dashboard.title}</span>
                    </div>
                    <div className="flex">
                      <p className="w-[60px] text-gray_9FA6B2 md:hidden lg:hidden">
                        초대자
                      </p>
                      <span>{invitation.inviter.nickname}</span>
                    </div>
                    <div className="flex gap-x-3">
                      <CtaDefault size="small">수락</CtaDefault>
                      <CtaDefault size="small" color="white">
                        거절
                      </CtaDefault>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
