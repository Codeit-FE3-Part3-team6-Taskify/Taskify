import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import TodoModal from '../../common/Modal/TodoModal/TodoModal';
import { axiosGet, axiosPut } from '@/features/axios';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import { changeCard, deleteCard } from '@/features/columnsSlice';

export default function UpdateTodo({ onClose, cardId }) {
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
  const [initialFormValues, setInitialFormValues] = useState(null);
  useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await axiosGet(`/cards/${cardId}`);
        if (!res.status) {
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
          // 처음 가져온 값 저장
          setInitialFormValues({
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

  const prevFormValuesRef = useRef(null);
  useEffect(() => {
    prevFormValuesRef.current = formValues;
  }, [formValues]);

  // 값이 변경되었는지 확인하는 함수
  const isFormValuesChanged = () => {
    if (!initialFormValues) return false;

    return Object.keys(formValues).some(
      (key) => formValues[key] !== initialFormValues[key],
    );
  };

  const disabled =
    isFormValuesChanged() &&
    formValues.title.trim() !== '' &&
    formValues.description.trim() !== '';

  const handleStatusSelect = (option) => {
    // 컬럼 선택
    setFormValues((prev) => ({
      ...prev,
      columnId: option.id,
    }));
  };

  // mock data- id: 대시보드 멤버 목록 조회-userId 사용
  // const assigneeOptions = [
  //   { id: 1244, value: '곰돌이', label: '곰돌이' }, // test id
  //   { id: 1288, value: '토끼', label: '토끼' }, // test2 id
  //   { id: 1244, value: '강아지', label: '강아지' },
  //   { id: 1288, value: '고양이', label: '고양이' },
  // ];
  const assigneeOptions = useSelector((state) => state.memberList.members);
  const statusOptions = useSelector((state) => state.columnList);
  // mock data- 추후 수정
  // const statusOptions = [
  //   { value: '16636', label: 'To Do' }, // columnnId
  //   { value: '16637', label: 'On Progress' },
  //   { value: '16764', label: 'Done' },
  // ];

  const handleUpdate = async (updatedFormValues) => {
    try {
      const res = await axiosPut(`cards/${cardId}`, updatedFormValues);

      if (!res.status) {
        // console.log('수정완료');
        dispatch(
          deleteCard({ columnId: initialFormValues.columnId, id: cardId }),
        );
        dispatch(
          changeCard({
            id: cardId,
            columnId: initialFormValues.columnId,
            data: res,
          }),
        );

        // console.log('응답:', res);
        onClose();
      }
    } catch (e) {
      console.error(e);
      // console.log('할 일 생성 실패');
    }
  };

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
          initialStatus={formValues.columnId}
          options={statusOptions}
          onSelect={handleStatusSelect}
        />
      }
    />
  );
}
