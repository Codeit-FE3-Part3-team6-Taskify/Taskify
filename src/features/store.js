import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfoSlice';

const store = configureStore({ reducer: userInfo.reducer });

export default store;
