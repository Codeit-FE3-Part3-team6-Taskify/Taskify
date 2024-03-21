/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  totalCount: 0,
  currentPage: 1,
};

const memberList = createSlice({
  name: 'invitedMemberSlice',
  initialState: initialValue,
  reducers: {
    setInvitedMembers: (state, action) => {
      const { members, totalCount } = action.payload;
      state.members = members;
      state.totalCount = totalCount;
    },
    addInvitedMember: (state, action) => {
      return {
        members: [...state.members, action.payload.member],
        totalCount: state.totalCount + 1,
      };
    },
    reset: () => {
      return initialValue;
    },
    deleteInvitedMember: (state, action) => {
      const filterMember = state.members.filter(
        (member) => member.id !== action.payload.id,
      );
      state.members = filterMember;
      state.totalCount -= 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setInvitedMembers,
  addInvitedMember,
  reset,
  deleteInvitedMember,
  setInvitedCurrentPage,
} = memberList.actions;

export default memberList;
