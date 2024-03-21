import React from 'react';
import Image from 'next/image';
import { DeleteIcon, EditIcon } from '../../../../public/images';

export default function DashboardColumnHeader({
  columnName,
  cardCount,
  toggleIsEdit,
  handleDeleteColumn,
}) {
  return (
    <>
      <h4 className="text-xl font-bold md:text-2xl">{columnName}</h4>
      <span className="ml-1 pt-[3px] pb-[3px] pl-[6px] pr-[6px] bg-gray_EEEEEE text-xs font-medium text-gray_787486 ">
        {cardCount}
      </span>
      <button onClick={toggleIsEdit} className="ml-auto " type="button">
        <Image width={22} height={22} src={EditIcon} alt="컬럼 수정 아이콘" />
      </button>
      <button onClick={handleDeleteColumn} type="button">
        <Image width={22} height={22} src={DeleteIcon} alt="컬럼 삭제 아이콘" />
      </button>
    </>
  );
}
