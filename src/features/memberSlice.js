/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  totalCount: 0,
  currentPage: 1,
};

const memberList = createSlice({
  name: 'memberList',
  initialState: initialValue,
  reducers: {
    setMembers: (state, action) => {
      const { members, totalCount } = action.payload;
      state.members = members;
      state.totalCount = totalCount;
    },
    addMember: (state, action) => {
      return {
        members: [...state.members, action.payload.member],
        totalCount: state.totalCount + 1,
      };
    },
    reset: () => {
      return initialValue;
    },
    deleteMember: (state, action) => {
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

export const { setMembers, addMember, reset, deleteMember, setCurrentPage } =
  memberList.actions;

export default memberList;
