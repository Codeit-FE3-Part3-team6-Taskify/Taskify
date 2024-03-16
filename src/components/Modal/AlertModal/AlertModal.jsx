import Modal from '../Modal';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';

export default function AlertModal({ onClose, text }) {
  return (
    <Modal onClose={onClose}>
      <div className="md:w-[540px] md:h-[250px] sm:w-[80vw] sm:h-[220px] py-7 relative flex justify-center items-center">
        <h2 className="text-lg pb-5">{text}</h2>
        <div className="absolute md:right-7 md:bottom-7 md:translate-x-0 sm:right-2/4 sm:translate-x-2/4">
          <CtaDefault onClick={onClose}>확인</CtaDefault>
        </div>
      </div>
    </Modal>
  );
}
