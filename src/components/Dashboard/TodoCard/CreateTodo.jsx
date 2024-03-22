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
        // console.log('생성완료');
        // console.log('응답:', res);
        dispatch(addCard({ data: res, columnId }));
        dispatch(plusCount({ columnId, count: 1 }));

        onClose();
      }
    } catch (e) {
      console.error(e);
      // console.log('할 일 생성 실패');
    }
  };

  // mock data- id: 대시보드 멤버 목록 조회-userId 사용
  // const assigneeOptions = [
  //   { id: 1244, value: '곰돌이', label: '곰돌이' }, // test id
  //   { id: 1288, value: '토끼', label: '토끼' }, // test2 id
  //   { id: 1244, value: '강아지', label: '강아지' },
  //   { id: 1288, value: '고양이', label: '고양이' },
  // ];
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
