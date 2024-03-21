/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialValue = [];

const columnList = createSlice({
  name: 'columnList',
  initialState: initialValue,
  reducers: {
    setColumn: (state, action) => {
      const { data } = action.payload;
      return data;
    },
    addColumn: (state, action) => {
      return [...state, action.payload.data];
    },
    reset: () => {
      return initialValue;
    },
    deleteColumn: (state, action) => {
      const filterColumn = state.filter(
        (column) => column.id !== action.payload.id,
      );
      return filterColumn;
    },
    changeColumnName: (state, action) => {
      const { data, id } = action.payload;
      const findColumn = state.findIndex((column) => column.id === id);
      state[findColumn].title = data.title;
    },
    addCardList: (state, action) => {
      const { data, columnId } = action.payload;
      const findColumn = state.findIndex((column) => column.id === columnId);
      if (state[findColumn].cardList) {
        const cards = [...state[findColumn].cardList, ...data];
        const resultCardList = cards.filter((card, index) => {
          return index === cards.findIndex((item) => item.id === card.id);
        });
        state[findColumn].cardList = resultCardList;
      } else {
        state[findColumn].cardList = data;
      }
    },
    addCard: (state, action) => {
      const { data, columnId } = action.payload;
      const findColumn = state.findIndex((column) => column.id === columnId);
      if (state[findColumn].cardList) {
        const cards = [data, ...state[findColumn].cardList];
        const resultCardList = cards.filter((card, index) => {
          return index === cards.findIndex((item) => item.id === card.id);
        });
        state[findColumn].cardList = resultCardList;
      } else {
        state[findColumn].cardList = [data];
      }
    },
    deleteCard: (state, action) => {
      const { columnId, id } = action.payload;
      const findColumn = state.findIndex((column) => column.id === columnId);
      const filterCard = state[findColumn].cardList.filter(
        (card) => card.id !== id,
      );
      state[findColumn].cardList = filterCard;
    },
    changeCard: (state, action) => {
      const { data, columnId, id } = action.payload;
      const findColumn = state.findIndex((column) => column.id === columnId);
      const findCard = state[findColumn].cardList.findIndex(
        (card) => card.id === id,
      );
      if (findColumn === data.columnId) {
        const result = [
          ...state[findColumn].cardList.slice(0, findCard),
          data,
          ...state[findColumn].cardList.slice(findCard + 1),
        ];
        state[findColumn].cardList = result;
      } else {
        const findChangeColumn = state.findIndex(
          (column) => column.id === data.columnId,
        );
        const { index } = action.payload;
        state[findChangeColumn].cardList = [
          ...state[findChangeColumn].cardList.slice(0, index),
          data,
          ...state[findChangeColumn].cardList.slice(index),
        ];
      }
    },
    setCount: (state, action) => {
      const { count, columnId } = action.payload;
      const findColumn = state.findIndex((column) => column.id === columnId);
      state[findColumn].totalCount = count;
    },
    plusCount: (state, action) => {
      const { count, columnId } = action.payload;
      const findColumn = state.findIndex((column) => column.id === columnId);
      if (state[findColumn].totalCount >= 0) {
        state[findColumn].totalCount += count;
      } else {
        state[findColumn].totalCount = count;
      }
    },
  },
});

export const {
  setColumn,
  addColumn,
  reset,
  deleteColumn,
  changeColumnName,
  addCard,
  deleteCard,
  changeCard,
  addCardList,
  setCount,
  plusCount,
} = columnList.actions;

export default columnList;
