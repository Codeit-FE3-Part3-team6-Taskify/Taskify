import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  dashboards: [],
  totalCount: 0,
  currentPage: 1,
};

export const dashboardList = createSlice({
  name: 'dashboardList',
  initialState: initialValue,
  reducers: {
    setDashboards: (state, action) => {
      const { dashboards, totalCount } = action.payload;
      state.dashboards = dashboards;
      state.totalCount = totalCount;
    },
    addDashboard: (state, action) => {
      state.totalCount += 1;

      if (state.currentPage === 1) {
        const newDashboards = [action.payload, ...state.dashboards];
        state.dashboards = newDashboards.slice(0, 6);
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setDashboards, addDashboard, setCurrentPage } =
  dashboardList.actions;
