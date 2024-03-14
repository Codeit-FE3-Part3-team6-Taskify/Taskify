import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import useModal from '@/hooks/useModal';

export default function Home() {
  const { openModal } = useModal();

  const onClickButton1 = () => {
    openModal({ type: 'first' });
  };

  const onClickButton2 = () => {
    openModal({ type: 'second' });
  };

  return (
    <>
      <div className="mx-auto mt-32 text-center">
        <CtaDefault onClick={onClickButton1}>첫번째 모달 열기</CtaDefault>
        <CtaDefault onClick={onClickButton2}>두번째 모달 열기</CtaDefault>
      </div>
      <div id="modal"></div>
    </>
  );
}
