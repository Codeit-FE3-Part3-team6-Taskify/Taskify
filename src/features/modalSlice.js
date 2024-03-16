/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  props: null,
};

export const modalSelector = (state) => state.modal;

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, props } = action.payload;
      state.type = type;
      state.props = props;
    },
    closeModal: (state, action) => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
