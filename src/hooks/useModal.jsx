import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '@/features/modalSlice';

function useModal() {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, props }) => {
    dispatch(openModal({ type, props }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleCloseModal = (type) => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
}

export default useModal;
