/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { axiosDelete, axiosGet } from '@/features/axios';
import CtaAdd from '@/components/common/Buttons/CtaAdd/CtaAdd';
import { SettingIcon } from '@/../public/images';
import DashboardCard from '../DashboardCard/DashboardCard';

// Todo(노진석) : 모달 추가하기
export default function DashboardColumn({ title, id, setColumns }) {
  const [cardList, setCardList] = useState();
  const [cardCount, setCardCount] = useState();
  const getCard = async () => {
    const res = await axiosGet(`cards?columnId=${id}`);
    setCardList(res.cards);
    setCardCount(res.totalCount);
  };

  const openAddCardModal = () => {
    // 모달 추가
  };
  const openEditCardModal = () => {
    // 모달 추가
  };

  const deleteColumn = () => {
    axiosDelete(`columns/${id}`);
    setColumns((prev) => prev.filter((column) => column.id !== id));
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getCard();
  }, [id]);

  return (
    <section className="flex flex-col gap-[10px] h-[470px] md:gap-4 lg:min-w-[354px] md:h-[346px] lg:h-full">
      <div className="flex gap-2 items-center mb-2 md:mb-[9px] w-full">
        <div className="w-2 h-2 bg-violet_5534DA rounded-full" />
        <h4 className="text-xl font-bold md:text-2xl">{title}</h4>
        <span className="ml-1 pt-[3px] pb-[3px] pl-[6px] pr-[6px] bg-gray_EEEEEE text-xs font-medium text-gray_787486 ">
          {cardCount}
        </span>
        {/* 아이콘 변경하기 */}
        <button onClick={openEditCardModal} className="ml-auto " type="button">
          <Image src={SettingIcon} alt="컬럼 수정 아이콘" />
        </button>
        <button onClick={deleteColumn} type="button">
          <Image src={SettingIcon} alt="컬럼 삭제 아이콘" />
        </button>
      </div>
      <div>
        <CtaAdd onClick={openAddCardModal} />
      </div>
      <div className="flex flex-col gap-[10px] overflow-y-auto md:gap-4">
        {cardList &&
          cardList.map((card) => (
            <DashboardCard key={card.id} cardInfo={card} />
          ))}
      </div>
    </section>
  );
}
