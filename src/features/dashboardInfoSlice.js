/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialValue = null;

const dashboardInfo = createSlice({
  name: 'dashboardInfo',
  initialState: initialValue,
  reducers: {
    setDashboardInfo: (state, actions) => actions.payload.data,
  },
});

export const { setDashboardInfo } = dashboardInfo.actions;

export default dashboardInfo;
