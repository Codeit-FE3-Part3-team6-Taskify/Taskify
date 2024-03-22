/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  totalCount: 0,
  emailCurrentPage: 1,
};

const invitedEmailListSlice = createSlice({
  name: 'invitedEmailList',
  initialState: initialValue,
  reducers: {
    setEmails: (state, action) => {
      const { invitations, totalCount } = action.payload;
      state.invitations = invitations;
      state.totalCount = totalCount;
    },
    addEmails: (state, action) => {
      return {
        invitations: [...state.invitations, action.payload.member],
        totalCount: state.totalCount + 1,
      };
    },
    reset: () => {
      return initialValue;
    },
    deleteEmails: (state, action) => {
      const filterMember = state.invitations.filter(
        (member) => member.id !== action.payload.id,
      );
      state.invitations = filterMember;
      state.totalCount -= 1;
    },
    setEmailCurrentPage: (state, action) => {
      state.emailCurrentPage = action.payload;
    },
  },
});

export const {
  setEmails,
  addEmails,
  reset,
  deleteEmails,
  setEmailCurrentPage,
} = invitedEmailListSlice.actions;

export default invitedEmailListSlice;
