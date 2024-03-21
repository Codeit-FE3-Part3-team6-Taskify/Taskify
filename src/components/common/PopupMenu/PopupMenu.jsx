/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch } from 'react-redux';
import { openModal } from '@/features/modalSlice';
import { axiosDelete } from '@/features/axios';

export default function PopupMenu({ cardId, onClose }) {
  // TODO(조예진): 추후 재사용 가능하도록 수정
  const dispatch = useDispatch();

  const handleOpenUpdateModal = () => {
    console.log('모달오픈!');
    dispatch(
      openModal({
        type: 'updateTodo',
        props: { cardId: cardId },
      }),
    );
  };

  const handleDeleteTodo = async () => {
    try {
      await axiosDelete(`/cards/${cardId}`);
      console.log(cardId, '삭제합니당');
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="rounded-md border border-gray_D9D9D9 w-fit p-1.5 bg-white_FFFFFF">
      <div
        className="py-1 px-4 rounded-[4px] bg-white_FFFFFF cursor-pointer hover:bg-violet_8% text-black_333236 hover:text-violet_5534DA text-xs md:text-sm"
        onClick={handleOpenUpdateModal}
      >
        수정하기
      </div>
      <div
        className="py-1 px-4 rounded-[4px] bg-white_FFFFFF cursor-pointer hover:bg-violet_8% text-black_333236 hover:text-violet_5534DA text-xs md:text-sm"
        onClick={handleDeleteTodo}
      >
        삭제하기
      </div>
    </div>
  );
}
