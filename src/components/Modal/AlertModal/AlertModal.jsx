import Modal from '../Modal';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';

export default function AlertModal({ onClose, text }) {
  return (
    <Modal onClose={onClose}>
      <div className="md:w-[540px] md:h-[250px] sm:w-full sm:h-[220px] sm:px-6 py-7 relative flex justify-center items-center">
        <h2 className="text-lg pb-3">{text}</h2>
        <div className="absolute right-7 bottom-7">
          <CtaDefault onClick={onClose}>확인</CtaDefault>
        </div>
      </div>
    </Modal>
  );
}
