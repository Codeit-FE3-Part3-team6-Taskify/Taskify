import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfoSlice';
import { modalSlice } from './modalSlice';

const rootReducer = {
  userInfo: userInfo.reducer,
  modal: modalSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
