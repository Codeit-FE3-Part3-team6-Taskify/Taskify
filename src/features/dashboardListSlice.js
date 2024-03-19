import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  dashboards: [],
  totalCount: 0,
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
      const newDashboards = [action.payload, ...state.dashboards];
      state.dashboards = newDashboards.slice(0, 6);

      state.totalCount += 1;
    },
    // 나중에 필요한 리듀서 있으면 추가 하기
  },
});

export const { setDashboards, addDashboard } = dashboardList.actions;
