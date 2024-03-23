/* eslint-disable no-shadow */
import { useDispatch } from 'react-redux';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import { deleteEmails } from '@/features/invitedEmailListSlice';
import { axiosDelete } from '@/features/axios';

export default function EmailListItem({ userEmail, dashboardId, invitedId }) {
  const dispatch = useDispatch();

  const handleCancelClick = async (invitedId) => {
    try {
      const res = await axiosDelete(
        `/dashboards/${dashboardId}/invitations/${invitedId}`,
        {
          dashboardId,
          invitationId: invitedId,
        },
      );
      dispatch(deleteEmails({ data: res }));
    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
    window.location.reload();
  };

  return (
    <div className="w-full flex justify-between border-b gap-y-2 md:items-center sm:py-[20px]">
      <h1>{userEmail}</h1>
      <CtaDefault
        size="small"
        color="white"
        onClick={() => handleCancelClick(invitedId)}
      >
        취소
      </CtaDefault>
    </div>
  );
}
