import { useSelector } from 'react-redux';
import TableBox from '@/components/common/Table/TableBox';
import PaginationButton from '@/components/common/Buttons/PaginationButton/PaginationButton';
import MemberListItem from './MemberListItem/MemberListItem';
import useGetMember from '@/hooks/useGetMember';

export default function MemberListEdit({ dashboardId }) {
  const { loading, nextPage, prevPage, currentPage } =
    useGetMember(dashboardId);

  const members = useSelector((state) => state.memberList.members);
  const totalCount = useSelector((state) => state.memberList.totalCount);
  const totalPage = totalCount ? Math.ceil(totalCount / 4) : 0;

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (!members || members.length <= 1) {
    content = <h1>초대된 멤버가 없습니다.</h1>;
  } else {
    content = members.map((member) => (
      <MemberListItem
        key={member.id}
        userId={member.userId}
        nickname={member.nickname}
        email={member.email}
        memberId={member.id}
        profileImageUrl={member.profileImageUrl}
        isOwner={member.isOwner}
      />
    ));
  }

  return (
    <TableBox>
      <div className="flex justify-between">
        <h2 className="mb-2 text-xl md:text-2xl font-bold">구성원</h2>
        <div className="flex justify-end items-center">
          <span className="mr-5">
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
            disabled={currentPage >= Math.ceil(totalCount / 4)}
          />
        </div>
      </div>
      <div className=" md:h-[404px] sm:max-h-[337px]">
        <h3 className="text-gray_9FA6B2 mt-5">이름</h3>
        {content}
      </div>
    </TableBox>
  );
}
