import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGet } from '@/features/axios';
import useIntersectionObserver from './useIntersectionObserver';
import { addCard } from '@/features/columnsSlice';

export default function useDashboardCardGet(id) {
  const cardList = useSelector((state) => {
    const findIdx = state.columnList.findIndex((column) => column.id === id);
    if (findIdx < 0) {
      return [];
    }
    return state.columnList[findIdx].cardList;
  });
  const dispatch = useDispatch();

  const [cardCount, setCardCount] = useState();
  const [cursorId, setCursorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const getCard = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await axiosGet(
        `cards?columnId=${id}&size=4${cursorId ? `&cursorId=${cursorId}` : ''}`,
      );
      setCursorId(res.cursorId);
      dispatch(addCard({ columnId: id, data: res.cards }));
      setCardCount(res.totalCount);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getCard();
  }, [id]);

  useIntersectionObserver(observerRef, scrollContainerRef, () => {
    if (cursorId !== null) {
      getCard();
    }
  });

  return { cardList, cardCount, setCardCount, scrollContainerRef, observerRef };
}
