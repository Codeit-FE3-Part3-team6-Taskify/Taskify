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
      return [
        ...state.slice(0, findColumn),
        data,
        ...state.slice(findColumn + 1),
      ];
    },
  },
});

export const { setColumn, addColumn, reset, deleteColumn, changeColumnName } =
  columnList.actions;

export default columnList;
