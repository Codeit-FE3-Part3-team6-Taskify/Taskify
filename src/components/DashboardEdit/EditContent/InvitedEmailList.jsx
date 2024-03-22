import { useSelector } from 'react-redux';
import TableBox from '@/components/common/Table/TableBox';
import PaginationButton from '@/components/common/Buttons/PaginationButton/PaginationButton';
import EmailListItem from './EmailListItem/EmailListItem';
import useGetInvitedEmails from '@/hooks/useGetInvitedEmails';

export default function InvitedEmailList({ dashboardId }) {
  const { loading, nextPage, prevPage, emailCurrentPage } =
    useGetInvitedEmails(dashboardId);

  const emails = useSelector((state) => state.invitedEmailList.invitations);
  const totalCount = useSelector((state) => state.invitedEmailList.totalCount);
  const totalPage = totalCount ? Math.ceil(totalCount / 4) : 0;

  let content = null;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (!emails || emails.length === 0) {
    content = <h1>초대된 멤버가 없습니다.</h1>;
  } else {
    content = emails.map((email) => (
      <EmailListItem
        key={email.id}
        userEmail={email.invitee.email}
        invitedId={email.id}
        dashboardId={dashboardId}
      />
    ));
  }

  return (
    <TableBox>
      <div className="flex justify-between">
        <h2 className="mb-2 text-xl md:text-2xl font-bold">초대 내역</h2>
        <div className="flex justify-end items-center">
          <span className="mr-5">
            {totalPage} 페이지 중 {emailCurrentPage}
          </span>
          <PaginationButton
            direction="prev"
            onClick={prevPage}
            disabled={emailCurrentPage === 1}
          />
          <PaginationButton
            direction="next"
            onClick={nextPage}
            disabled={emailCurrentPage >= Math.ceil(totalCount / 5)}
          />
        </div>
      </div>
      <div className=" md:h-[404px] sm:max-h-[337px]">
        <h3 className="text-gray_9FA6B2 mt-5">이메일</h3>
        {content}
      </div>
    </TableBox>
  );
}
