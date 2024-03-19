import React from 'react';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';

export default function DashboardColumnForm({
  columnName,
  setColumnName,
  handleSubmit,
  handleReset,
}) {
  return (
    <form className="w-full flex items-center gap-4" onSubmit={handleSubmit}>
      <input
        className=" solid border-[1px] rounded-[1px] outline-none border-blue_76A6EA p-[6px] lg:w-[150px]"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
      />
      <div className="ml-auto flex gap-4 lg:gap-1">
        <CtaDefault disabled={columnName === ''} size="xsmall" type="submit">
          수정
        </CtaDefault>
        <CtaDefault onClick={handleReset} size="xsmall" type="button">
          취소
        </CtaDefault>
      </div>
    </form>
  );
}
