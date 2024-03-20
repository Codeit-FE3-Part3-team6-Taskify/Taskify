/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import React from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import { CalendarIcon } from '../../../../public/images';
import { TAG_COLORS } from '@/constants/colors';

// Todo(노진석) : 카드 기능완성하기
export default function DashboardCard({ cardInfo }) {
  const { title, dueDate, tags, imageUrl, assignee } = cardInfo;
  const openCardModal = () => {
    // 모달 들어올 예정
  };

  return (
    <article
      onClick={openCardModal}
      className=" cursor-pointer flex flex-col gap-[6px] p-3 rounded-md border-solid border-[1px] border-gray_D9D9D9 md:flex-row md:gap-5 md:p-5 lg:flex-col"
    >
      {imageUrl ? (
        <section className="m-auto relative w-full h-[151px] md:w-[123px] md:h-[68px] lg:w-full lg:h-[160px]">
          <Image
            className="rounded-md object-cover "
            fill
            src={imageUrl}
            alt={`${title} 이미지`}
            priority
            sizes="fill"
          />
        </section>
      ) : null}

      <section className="flex flex-col gap-[6px] md:w-full">
        <h5 className="text-lg font-medium mt-1 ">{title}</h5>
        <div className="flex flex-col md:flex-row md:items-center md:w-full md:gap-4 lg:flex-col lg:items-stretch lg:gap-0">
          <div className="flex gap-[6px]">
            {tags &&
              tags.map((tag, i) => (
                <div
                  className="px-[6px] py-1 text-xs font-normal"
                  style={{
                    background: TAG_COLORS[i].background,
                    color: TAG_COLORS[i].text,
                  }}
                  key={tag + i}
                >
                  {tag}
                </div>
              ))}
          </div>
          <div className="relative flex items-center gap-[6px] flex-auto">
            <Image
              className="relative top-[-1px]"
              width={18}
              height={18}
              src={CalendarIcon}
              alt="달력 아이콘"
            />
            <span className="text-xs font-medium text-gray_787486 md:text-sm">
              {dueDate}
            </span>
            <span className="ml-auto">
              <Avatar text={assignee.nickname[0].toUpperCase()} />
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}
