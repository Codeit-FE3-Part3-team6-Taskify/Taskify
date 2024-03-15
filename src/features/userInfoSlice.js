import { createSlice } from '@reduxjs/toolkit';

const initialValue = { userInfo: {} };

const userInfo = createSlice({
  name: 'userInfo',
  initialState: initialValue,
  reducers: {
    addUserInfo: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    reset: () => {
      return initialValue;
    },
  },
});

export const { addUserInfo, reset } = userInfo.actions;

export default userInfo;
