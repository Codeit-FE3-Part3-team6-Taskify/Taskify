import useModal from '@/hooks/useModal';

export default function test() {
  const { openModal } = useModal();
  const handleOpenModal = () => {
    openModal({
      type: 'createTodo',
      props: { dashboardId: 4939, columnId: 16636 },
    });
  };
  return (
    <button type="button" onClick={handleOpenModal}>
      모달열기
    </button>
  );
}
