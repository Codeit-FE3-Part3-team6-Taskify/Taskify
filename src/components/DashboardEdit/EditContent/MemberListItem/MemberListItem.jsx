/* eslint-disable no-shadow */
import { useDispatch } from 'react-redux';
import { deleteMember } from '@/features/memberSlice';
import Avatar from '@/components/common/Avatar/Avatar';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import { axiosDelete } from '@/features/axios';

export default function MemberListItem({
  userId,
  nickname,
  email,
  memberId,
  profileImageUrl,
}) {
  const dispatch = useDispatch();
  const handleDeleteClick = async () => {
    try {
      await axiosDelete(`/members/${memberId}`, {});
      dispatch(deleteMember({ id: memberId }));
    } catch (error) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  return (
    <div className="w-full flex border-b pb-[20px] gap-y-2 md:items-center sm:pt-[20px] ">
      <div className="flex items-center gap-3 w-full">
        <Avatar
          userId={userId}
          size="large"
          image={profileImageUrl || null}
          text={email.charAt(0).toUpperCase()}
        />
        <span>{nickname}</span>
      </div>
      <CtaDefault
        size="small"
        color="white"
        onClick={() => handleDeleteClick()}
      >
        삭제
      </CtaDefault>
    </div>
  );
}
