import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import useModal from '@/hooks/useModal';

export default function Home() {
  const { openModal } = useModal();

  const onClickButton1 = () => {
    openModal({
      type: 'alert',
      props: { text: '비밀번호가 일치하지 않습니다.' },
    });
  };

  return (
    <div className="mx-auto mt-32 text-center">
      <CtaDefault onClick={onClickButton1}>모달 열기</CtaDefault>
    </div>
  );
}
