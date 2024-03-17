import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
  createdAt: '',
};

const userInfo = createSlice({
  name: 'userInfo',
  initialState: initialValue,
  reducers: {
    addUserInfo: (state, action) => {
      return { ...action.payload };
    },
    reset: () => {
      return initialValue;
    },
    changeNickname: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.nickname = action.payload.nickname;
    },
  },
});

export const { addUserInfo, reset } = userInfo.actions;

export default userInfo;
