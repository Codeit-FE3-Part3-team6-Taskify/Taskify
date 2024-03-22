/* eslint-disable no-shadow */
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DashboardCard from '../DashboardCard/DashboardCard';

export default function DashboardCardList({
  cardList,
  id,
  scrollContainerRef,
  observerRef,
  columnTitle,
}) {
  return (
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
                      <DashboardCard
                        cardInfo={card}
                        columnTitle={columnTitle}
                      />
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
  );
}
