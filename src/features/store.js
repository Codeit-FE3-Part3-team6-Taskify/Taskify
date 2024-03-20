import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfoSlice';
import { modalSlice } from './modalSlice';
import memberList from './memberSlice';
import columnList from './columnsSlice';
import { dashboardList } from './dashboardListSlice';
import { sidebarDashboardList } from './sidebarDashboardListSlice';

const rootReducer = {
  userInfo: userInfo.reducer,
  modal: modalSlice.reducer,
  memberList: memberList.reducer,
  columnList: columnList.reducer,
  dashboardList: dashboardList.reducer,
  sidebarDashboardList: sidebarDashboardList.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
