/* eslint-disable no-useless-return */
/* eslint-disable no-shadow */
import { useDispatch } from 'react-redux';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import { deleteEmails } from '@/features/invitedEmailListSlice';
import { axiosDelete } from '@/features/axios';

export default function EmailListItem({ userEmail, dashboardId, invitedId }) {
  const dispatch = useDispatch();

  const handleCancelClick = async () => {
    try {
      await axiosDelete(`/dashboards/${dashboardId}/invitations/${invitedId}`);
      dispatch(deleteEmails({ id: invitedId }));
    } catch (error) {
      return;
    }
  };

  return (
    <div className="w-full flex justify-between border-b gap-y-2 md:items-center sm:py-[20px]">
      <h1>{userEmail}</h1>
      <CtaDefault
        size="small"
        color="white"
        onClick={() => handleCancelClick()}
      >
        취소
      </CtaDefault>
    </div>
  );
}
