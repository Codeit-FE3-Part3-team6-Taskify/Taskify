import { useState, useEffect } from 'react';
import TodoModal from '../../common/Modal/TodoModal/TodoModal';
import { axiosGet, axiosPut } from '@/features/axios';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

export default function UpdateTodo({ onClose, cardId }) {
  const [formValues, setFormValues] = useState({
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageUrl: '',
  });

  // mock data- id: 대시보드 멤버 목록 조회-userId 사용
  const assigneeOptions = [
    { id: 1244, value: '곰돌이', label: '곰돌이' }, // test id
    { id: 1288, value: '토끼', label: '토끼' }, // test2 id
    { id: 1244, value: '강아지', label: '강아지' },
    { id: 1288, value: '고양이', label: '고양이' },
  ];

  // mock data- 추후 수정
  const statusOptions = [
    { value: '16636', label: 'To Do' }, // columnnId
    { value: '16637', label: 'On Progress' },
    { value: '16764', label: 'Done' },
  ];

  useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await axiosGet(`/cards/${cardId}`);
        if (!res.status) {
          // console.log('res', res);
          setFormValues({
            assigneeUserId: res.assignee.id,
            dashboardId: res.dashboardId,
            columnId: res.columnId,
            title: res.title,
            description: res.description,
            dueDate: res.dueDate,
            tags: res.tags,
            imageUrl: res.imageUrl,
          });
        }
      } catch (e) {
        console.error('나의 정보를 가져오지 못했습니다.: ', e);
      }
    };
    getTodoData();
  }, []);

  const handleStatusSelect = (option) => {
    // 컬럼 선택
    setFormValues((prev) => ({
      ...prev,
      columnId: Number(option.value),
    }));
  };

  const handleUpdate = async (updatedFormValues) => {
    try {
      const res = await axiosPut(`cards/${cardId}`, updatedFormValues);

      if (!res.status) {
        console.log('수정완료');
        // console.log('응답:', res);
        onClose();
      }
    } catch (e) {
      console.log(e);
      console.log('할 일 생성 실패');
    }
  };

  // TODO(조예진) : 제목, 설명 필수, 상태 고르면 수정 버튼 활성화
  const disabled = Object.values(formValues).every((value) => !!value);

  return (
    <TodoModal
      isUpdate
      columnId={formValues.columnId}
      onClose={onClose}
      formValues={formValues}
      setFormValues={setFormValues}
      onSubmit={handleUpdate}
      assigneeOptions={assigneeOptions}
      disabled={disabled}
      dropdownMenu={
        <DropdownMenu
          initialStatus={String(formValues.columnId)}
          options={statusOptions}
          onSelect={handleStatusSelect}
        />
      }
    />
  );
}
