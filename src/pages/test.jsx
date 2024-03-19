import useModal from '@/hooks/useModal';

export default function test() {
  const { openModal } = useModal();
  const handleOpenTodoModal = () => {
    openModal({
      type: 'createTodo',
      props: { dashboardId: 4939, columnId: 16636 },
    });
  };

  // // columns를 가져오고 있다는 전제
  // const handleOpenAddColumnsModal = () => {
  //   openModal({
  //     type: 'createColumn',
  //     props: {
  //       dashboardId: 4939,
  //       columns: columns,
  //     },
  //   });
  // };

  const handleOpenInviteModal = () => {
    openModal({
      type: 'inviteDashboard',
      props: {
        dashboardId: 4939,
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
      {/* <div>
        <button type="button" onClick={handleOpenAddColumnsModal}>
          칼럼 추가 모달 열기
        </button>
      </div> */}

      {/* 초대하기 예시 */}
      <div>
        <button type="button" onClick={handleOpenInviteModal}>
          초대하기 열기
        </button>
      </div>
    </>
  );
}
