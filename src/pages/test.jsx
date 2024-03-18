import { axiosPostJason } from '@/features/axios';
import useModal from '@/hooks/useModal';

export default function test() {
  const { openModal } = useModal();
  const handleOpenTodoModal = () => {
    openModal({
      type: 'createTodo',
      props: { dashboardId: 4939, columnId: 16636 },
    });
  };

  // 칼럼 추가 모달 : api 관련 로직은 바깥에서 (모달 안에서 선언x)
  // columns를 가져오고 있다는 전제 하에 조건

  const postColumn = async (inputValue) => {
    try {
      await axiosPostJason('/columns', {
        title: inputValue,
        dashboardId: 4939,
      });
    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
  };

  const handleOpenAddColumnsModal = () => {
    openModal({
      type: 'input',
      props: {
        title: '새 칼럼 생성',
        labelName: '이름',
        dashboardId: 4939,
        handleConfirm: postColumn,
        submitButtonText: '생성',
      },
    });
  };

  return (
    // 할 일 추가 모달
    <>
      <div>
        <button type="button" onClick={handleOpenTodoModal}>
          할 일 추가 모달 열기
        </button>
      </div>

      {/* 칼럼 추가 예시 */}
      <div>
        <button type="button" onClick={handleOpenAddColumnsModal}>
          칼럼 추가 모달 열기
        </button>
      </div>
    </>
  );
}
