import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelector, closeModal } from '@/features/modalSlice';
import SampleModalOne from '@/components/Modal/SampleModalOne/SampleModalOne';
import SampleModalTwo from '@/components/Modal/SampleModalTwo/SampleModalTwo';

const MODAL_COMPONENTS = {
  first: SampleModalOne,
  second: SampleModalTwo,
};

export default function ModalContainer() {
  const { type, props } = useSelector(modalSelector);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!type) {
    return null;
  }

  const Modal = MODAL_COMPONENTS[type];

  return createPortal(
    <>
      <Modal {...props} onClose={handleCloseModal} />
    </>,
    document.getElementById('modal'),
  );
}
