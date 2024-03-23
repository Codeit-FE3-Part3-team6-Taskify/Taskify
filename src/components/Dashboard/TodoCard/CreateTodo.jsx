/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */
/* eslint-disable import/order */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoModal from '../../common/Modal/TodoModal/TodoModal';
import { axiosPostJason } from '@/features/axios';
import { addCard, plusCount } from '@/features/columnsSlice';

export default function CreateTodo({ onClose, dashboardId, columnId }) {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
  });

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      dashboardId: dashboardId,
      columnId: columnId,
    }));
  }, []);

  const handleCreate = async () => {
    try {
      const res = await axiosPostJason('cards', formValues);

      if (!res.status) {
        dispatch(addCard({ data: res, columnId }));
        dispatch(plusCount({ columnId, count: 1 }));

        onClose();
      }
    } catch (e) {
      return e.response;
    }
  };

  const assigneeOptions = useSelector((state) => state.memberList.members);

  const disabled = Object.values(formValues).every((value) => !!value);

  return (
    <TodoModal
      columnId={columnId}
      onClose={onClose}
      formValues={formValues}
      setFormValues={setFormValues}
      onSubmit={handleCreate}
      assigneeOptions={assigneeOptions}
      disabled={disabled}
    />
  );
}
