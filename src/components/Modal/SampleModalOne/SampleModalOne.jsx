import Modal from '../Modal';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';

export default function SampleModalOne({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>모달 내용1</h2>
      <CtaDefault onClick={onClose}>확인</CtaDefault>
    </Modal>
  );
}
