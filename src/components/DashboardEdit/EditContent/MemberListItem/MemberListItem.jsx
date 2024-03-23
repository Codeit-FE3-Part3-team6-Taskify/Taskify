/* eslint-disable no-shadow */
import { useDispatch } from 'react-redux';
import { deleteMember } from '@/features/memberSlice';
import Avatar from '@/components/common/Avatar/Avatar';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import { axiosDelete } from '@/features/axios';

export default function MemberListItem({ nickname, email, memberId }) {
  const dispatch = useDispatch();

  const handleDeleteClick = async (memberId) => {
    try {
      const res = await axiosDelete(`/members/${memberId}`, {
        memberId,
      });
      dispatch(deleteMember({ data: res }));
    } catch (error) {
      return;
    }
    window.location.reload();
  };

  return (
    <div className="w-full flex border-b pb-[20px] gap-y-2 md:items-center md:pt-[20px] ">
      <div className="flex items-center gap-3 w-full">
        <Avatar size="large" text={email.charAt(0).toUpperCase()} />
        <span>{nickname}</span>
      </div>
      <CtaDefault
        size="small"
        color="white"
        onClick={() => handleDeleteClick(memberId)}
      >
        삭제
      </CtaDefault>
    </div>
  );
}
