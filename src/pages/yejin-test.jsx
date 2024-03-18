import Image from 'next/image';
import DashboardHeader from '@/components/common/Header/DashboardHeader';
import useModal from '@/hooks/useModal';
import CtaIcon from '@/components/common/Buttons/CtaIcon/CtaIcon';
import { CrownIcon, SettingIcon, AddButtonEmpty } from '../../public/images';

export default function test() {
  const { openModal } = useModal();
  const handleOpenModal = () => {
    openModal({
      type: 'createTodo',
      // props: { dashboardId: 4939, columnId: 16636 },
      props: { dashboardId: 4925, columnId: 16588 },
    });
  };

  const handleOpenModalAlert = () => {
    openModal({
      type: 'alert',
      props: { text: '모달테스트' },
    });
  };

  const participants = [
    { id: 1, email: 'example1@example.com', nickname: '김' },
    { id: 2, email: 'xample2@example.com', nickname: '이' },
    { id: 3, email: 'ample3@example.com', nickname: '박' },
    { id: 4, email: 'example1@example.com', nickname: '김' },
    { id: 5, email: 'xample2@example.com', nickname: '이' },
    { id: 6, email: 'ample3@example.com', nickname: '박' },
    // { id: 6, email: 'ample3@example.com', nickname: '박' },
  ];
  const userInfo = { nickname: 'yejin', email: 'yejiniee@codeit.com' };

  return (
    <>
      <DashboardHeader
        hasSpace
        title="대시보드"
        ownerIcon={<Image src={CrownIcon} alt="" width={20} height={16} />}
        buttons={
          <>
            <CtaIcon imageSrc={SettingIcon}>관리</CtaIcon>
            <CtaIcon imageSrc={AddButtonEmpty}>초대하기</CtaIcon>
          </>
        }
        participants={participants}
        divider
        userInfo={userInfo}
      />

      <button type="button" onClick={handleOpenModal}>
        모달열기
      </button>

      <button type="button" onClick={handleOpenModalAlert}>
        모달열기2
      </button>
    </>
  );
}
