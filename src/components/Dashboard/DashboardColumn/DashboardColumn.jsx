/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Draggable, Droppable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosDelete, axiosPut } from '@/features/axios';
import CtaAdd from '@/components/common/Buttons/CtaAdd/CtaAdd';
import DashboardCard from '../DashboardCard/DashboardCard';
import DashboardColumnForm from '../DashboardColumnForm/DashboardColumnForm';
import { changeColumnName, deleteColumn } from '@/features/columnsSlice';
import useDashboardCardGet from '@/hooks/useDashboardCardGet';
import DashboardColumnHeader from '../DashboardColumnHeader/DashboardColumnHeader';

// Todo(노진석) : 모달 추가하기
export default function DashboardColumn({ title, id, dashboardId, openModal }) {
  const [isEdit, setIsEdit] = useState(false);
  const [columnName, setColumnName] = useState(title);
  const dispatch = useDispatch();
  const { cardList, cardCount, observerRef, scrollContainerRef } =
    useDashboardCardGet(id);

  // 모달 넘어오면 수정예정
  const openAddCardModal = () => {
    openModal({
      type: 'createTodo',
      props: { dashboardId, columnId: id },
    });
  };

  const toggleIsEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleDeleteColumn = () => {
    axiosDelete(`columns/${id}`);
    dispatch(deleteColumn({ id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosPut(`columns/${id}`, { title: columnName });
    dispatch(changeColumnName({ data: res, id }));
    toggleIsEdit();
  };

  const handleReset = () => {
    setColumnName(title);
    toggleIsEdit();
  };

  return (
    <section className="m-auto flex flex-col gap-[10px] w-[308px] h-[470px] md:w-full md:gap-4 lg:min-w-[354px] lg:max-w-[354px] lg:m-0 md:h-[346px]  lg:h-full ">
      <div className="flex gap-2 items-center mb-2 md:mb-[9px] w-full">
        <div className="w-2 h-2 bg-violet_5534DA rounded-full" />
        {isEdit ? (
          <DashboardColumnForm
            columnName={columnName}
            setColumnName={setColumnName}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        ) : (
          <DashboardColumnHeader
            columnName={columnName}
            cardCount={cardCount}
            toggleIsEdit={toggleIsEdit}
            handleDeleteColumn={handleDeleteColumn}
          />
        )}
      </div>

      <div>
        <CtaAdd onClick={openAddCardModal} />
      </div>

      <Droppable droppableId={id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className=" min-h-10 h-5/6"
          >
            <div
              ref={scrollContainerRef}
              className=" flex flex-col gap-[10px] overflow-y-auto md:gap-4 mt-[-10px] md-[-16px] h-full"
            >
              {cardList &&
                cardList.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="mt-[10px] md:mt-4"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DashboardCard cardInfo={card} />
                      </div>
                    )}
                  </Draggable>
                ))}

              <div ref={observerRef} className="w-full h-[5px] opacity-0">
                마지막
              </div>
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </section>
  );
}
