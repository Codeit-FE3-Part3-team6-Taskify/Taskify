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
import { useRouter } from 'next/router';

export default function PopupMenu({
  cardId,
  onClose,
  setIsPopupOpen,
  columnId,
  options,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMenuClick = async (option) => {
    switch (option) {
      case '수정하기':
        dispatch(
          openModal({
            type: 'updateTodo',
            props: { cardId: cardId },
          }),
        );
        break;
      case '삭제하기':
        try {
          await axiosDelete(`/cards/${cardId}`);
          dispatch(deleteCard({ id: cardId, columnId }));
          onClose();
        } catch (e) {
          alert('카드를 삭제 할 수 없습니다. 다시 시도해주세요.');
        }
        break;
      case '로그아웃':
        // TODO(조예진): 로그아웃 처리
        break;
      case '내 정보':
        router.push('/mypage');
        break;
      case '내 대시보드':
        router.push('/mydashboard');
        break;

      default:
        break;
    }
    setIsPopupOpen(false);
  };

  const popupRef = useRef(null);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useOutsideClick(popupRef, handleClosePopup);

  return (
    <div
      ref={popupRef}
      className=" whitespace-nowrap rounded-md border border-gray_D9D9D9 w-fit p-1.5 bg-white_FFFFFF"
    >
      {options.map((option, index) => (
        <div
          key={index}
          className="flex flex-col items-center py-1 px-4 rounded-[4px] bg-white_FFFFFF cursor-pointer hover:bg-violet_8% text-black_333236 hover:text-violet_5534DA text-xs md:text-sm"
          onClick={() => handleMenuClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
