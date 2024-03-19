import { useEffect, useRef, useState } from 'react';
import { axiosGet } from '@/features/axios';
import useIntersectionObserver from './useIntersectionObserver';

export default function useDashboardCardGet(id) {
  const [cardList, setCardList] = useState([]);
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
      setCardList((prev) => {
        const cards = [...prev, ...res.cards];
        const resultCardList = cards.filter((card, index) => {
          return index === cards.findIndex((item) => item.id === card.id);
        });
        return resultCardList;
      });
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

  return { cardList, setCardList, cardCount, scrollContainerRef, observerRef };
}
