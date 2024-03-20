/* eslint-disable object-shorthand */
import { useEffect, useState } from 'react';
import TodoModal from '../../common/Modal/TodoModal/TodoModal';
import { axiosPostJason } from '@/features/axios';

export default function CreateTodo({ onClose, dashboardId, columnId }) {
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
        console.log('생성완료');
        console.log('응답:', res);
        onClose();
      }
    } catch (e) {
      console.log(e);
      console.log('할 일 생성 실패');
    }
  };

  // mock data- id: 대시보드 멤버 목록 조회-userId 사용
  const assigneeOptions = [
    { id: 1244, value: '곰돌이', label: '곰돌이' }, // test id
    { id: 1288, value: '토끼', label: '토끼' }, // test2 id
    { id: 1244, value: '강아지', label: '강아지' },
    { id: 1288, value: '고양이', label: '고양이' },
  ];

  const disabled = Object.values(formValues).every((value) => !!value);

  return (
    <TodoModal
      columnId={16636}
      onClose={onClose}
      formValues={formValues}
      setFormValues={setFormValues}
      onSubmit={handleCreate}
      assigneeOptions={assigneeOptions}
      disabled={disabled}
    />
  );
}
