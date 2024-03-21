import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  sidebarDashboards: [],
  sidebarTotalCount: 0,
  sidebarCurrentPage: 1,
};

export const sidebarDashboardList = createSlice({
  name: 'sidebarDashboardList',
  initialState: initialValue,
  reducers: {
    setSidebarDashboards: (state, action) => {
      const { sidebarDashboards, sidebarTotalCount } = action.payload;
      state.sidebarDashboards = sidebarDashboards;
      state.sidebarTotalCount = sidebarTotalCount;
    },
    addSidebarDashboard: (state, action) => {
      state.sidebarTotalCount += 1;

      if (state.sidebarCurrentPage === 1) {
        const newDashboards = [action.payload, ...state.sidebarDashboards];
        state.sidebarDashboards = newDashboards.slice(0, 10);
      }
    },
    setSidebarCurrentPage: (state, action) => {
      state.sidebarCurrentPage = action.payload;
    },
  },
});

export const {
  setSidebarDashboards,
  addSidebarDashboard,
  setSidebarCurrentPage,
} = sidebarDashboardList.actions;
