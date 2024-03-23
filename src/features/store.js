import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfoSlice';
import { modalSlice } from './modalSlice';
import memberList from './memberSlice';
import columnList from './columnsSlice';
import { dashboardList } from './dashboardListSlice';
import { sidebarDashboardList } from './sidebarDashboardListSlice';
import { invitationsDashboardList } from './invitationsDashboardListSlice';
import invitedEmailListSlice from './invitedEmailListSlice';
import dashboardInfo from './dashboardInfoSlice';

const rootReducer = {
  userInfo: userInfo.reducer,
  modal: modalSlice.reducer,
  memberList: memberList.reducer,
  dashboardInfo: dashboardInfo.reducer,
  columnList: columnList.reducer,
  dashboardList: dashboardList.reducer,
  sidebarDashboardList: sidebarDashboardList.reducer,
  invitationsDashboardList: invitationsDashboardList.reducer,
  invitedEmailList: invitedEmailListSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
