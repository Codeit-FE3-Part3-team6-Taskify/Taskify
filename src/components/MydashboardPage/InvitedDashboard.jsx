import { useRef } from 'react';
import Image from 'next/image';
import { SearchIcon } from '../../../public/images';
import CtaDefault from '../Buttons/CtaDefault/CtaDefault';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// 송상훈 TODO :invitations가 없을때 맨아래 div가 뜨는데 그럼 로딩때는..?
export default function InvitedDashboard({ invitations, fetchMore, loading }) {
  const observerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useIntersectionObserver(observerRef, scrollContainerRef, () => {
    if (!loading) {
      fetchMore();
    }
  });

  return (
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
            <Image src={SearchIcon} width={24} height={24} alt="돋보기아이콘" />
          </div>
        </div>
      </div>

      <div className="hidden md:text-gray_9FA6B2 md:grid md:grid-cols-3 ">
        <p>이름</p>
        <p>초대자</p>
        <p>수락 여부</p>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-col gap-y-2 h-[400px] overflow-y-scroll rounded-[8px]"
      >
        {invitations ? (
          <>
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex flex-col border-b pb-[20px] gap-y-2 md:flex-row md:items-center md:grid md:grid-cols-3 md:pt-[20px] "
              >
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
            <div ref={observerRef} className="h-[1px]" />
          </>
        ) : (
          <div>초대받은 대시보드가 없습니다</div>
        )}
      </div>
    </section>
  );
}
