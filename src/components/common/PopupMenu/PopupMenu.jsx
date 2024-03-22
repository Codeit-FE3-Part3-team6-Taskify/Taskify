/* eslint-disable no-alert */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@/features/modalSlice';
import { axiosDelete } from '@/features/axios';
import useOutsideClick from '@/hooks/useOutSideClick';
import { deleteCard } from '@/features/columnsSlice';

export default function PopupMenu({
  cardId,
  onClose,
  setIsPopupOpen,
  columnId,
}) {
  // TODO(조예진): 추후 재사용 가능하도록 수정
  const dispatch = useDispatch();

  const handleOpenUpdateModal = () => {
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

      dispatch(deleteCard({ id: cardId, columnId }));
      onClose();
    } catch (e) {
      alert('카드를 삭제 할 수 없습니다. 다시 시도해주세요.');
    }
  };

  const popupRef = useRef(null);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useOutsideClick(popupRef, handleClosePopup);

  return (
    <div
      ref={popupRef}
      className="rounded-md border border-gray_D9D9D9 w-fit p-1.5 bg-white_FFFFFF"
    >
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
