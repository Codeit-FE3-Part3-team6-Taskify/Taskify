import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfoSlice';
import { modalSlice } from './modalSlice';
import memberList from './memberSlice';
import columnList from './columnsSlice';

const rootReducer = {
  userInfo: userInfo.reducer,
  modal: modalSlice.reducer,
  memberList: memberList.reducer,
  columnList: columnList.reducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
