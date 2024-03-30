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
    changeSidebarDashboard: (state, action) => {
      const { data } = action.payload;
      const findIndex = state.sidebarDashboards.findIndex(
        (dashboard) => dashboard.id === data.id,
      );
      if (findIndex >= 0) {
        state.sidebarDashboards = [
          ...state.sidebarDashboards.slice(0, findIndex),
          data,
          ...state.sidebarDashboards.slice(findIndex + 1),
        ];
      }
    },
    resetSideDashboard: () => initialValue,
  },
});

export const {
  setSidebarDashboards,
  addSidebarDashboard,
  setSidebarCurrentPage,
  changeSidebarDashboard,
  resetSideDashboard,
} = sidebarDashboardList.actions;
