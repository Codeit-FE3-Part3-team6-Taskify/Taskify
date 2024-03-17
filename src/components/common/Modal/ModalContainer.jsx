import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelector, closeModal } from '@/features/modalSlice';
import AlertModal from '@/components/Modal/AlertModal/AlertModal';
import CreateTodoModal from '../Dashboard/CreateTodoModal';

const MODAL_COMPONENTS = {
  alert: AlertModal,
  createTodo: CreateTodoModal,
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
    <Modal {...props} onClose={handleCloseModal} />,
    document.getElementById('modal'),
  );
}
