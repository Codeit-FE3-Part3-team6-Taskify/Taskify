import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelector, closeModal } from '@/features/modalSlice';
import AlertModal from './AlertModal/AlertModal';
import CreateTodoModal from '@/components/Dashboard/CreateTodoModal';
import CreateDashboardModal from './CreateDashboardModal/CreateDashboardModal';

const MODAL_COMPONENTS = {
  alert: AlertModal,
  createTodo: CreateTodoModal,
  createDashboard: CreateDashboardModal,
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
