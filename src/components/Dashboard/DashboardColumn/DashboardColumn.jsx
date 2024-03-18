/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { axiosGet } from '@/features/axios';
import CtaAdd from '@/components/common/Buttons/CtaAdd/CtaAdd';
import { SettingIcon } from '@/../public/images';

export default function DashboardColumn({ title, id }) {
  const [cardList, setCardList] = useState();
  const [cardCount, setCardCount] = useState();
  const getCard = async () => {
    const res = await axiosGet(`cards?size=10&columnId=${id}`);
    setCardList(res.cards);
    setCardCount(res.totalCount);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getCard();
  }, [id]);

  return (
    <section className="flex flex-col gap-[10px] md:gap-4 lg:min-w-[354px] ">
      <div className="flex gap-2 items-center mb-2 md:mb-[9px] w-full">
        <div className="w-2 h-2 bg-violet_5534DA rounded-full" />
        <h4 className="text-4 font-bold">{title}</h4>
        <span className="ml-1 pt-[3px] pb-[3px] pl-[6px] pr-[6px] bg-gray_EEEEEE text-xs font-medium text-gray_787486 ">
          {cardCount}
        </span>
        <button className="ml-auto" type="button">
          <Image src={SettingIcon} alt="컬럼 수정 아이콘" />
        </button>
        <button type="button">
          <Image src={SettingIcon} alt="컬럼 삭제 아이콘" />
        </button>
      </div>

      <CtaAdd />
      {cardList &&
        cardList.map((card) => <div key={card.id}>{card.title}</div>)}
    </section>
  );
}
