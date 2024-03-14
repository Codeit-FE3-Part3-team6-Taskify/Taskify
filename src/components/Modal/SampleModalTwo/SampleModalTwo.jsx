import Modal from '../Modal';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';

export default function SampleModalTwo({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>모달 내용2</h2>
      <CtaDefault onClick={onClose}>확인</CtaDefault>
    </Modal>
  );
}
