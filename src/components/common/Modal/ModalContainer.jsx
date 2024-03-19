import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { modalSelector, closeModal } from '@/features/modalSlice';
import AlertModal from './AlertModal/AlertModal';
import CreateColumnModal from './CreateColumnModal/CreateColumnModal';
import CreateTodo from '../../Dashboard/TodoCard/CreateTodo';
import UpdateTodo from '../../Dashboard/TodoCard/UpdateTodo';
import CreateDashboardModal from './CreateDashboardModal/CreateDashboardModal';

const MODAL_COMPONENTS = {
  alert: AlertModal,
  createColumn: CreateColumnModal,
  createTodo: CreateTodo,
  updateTodo: UpdateTodo,
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
