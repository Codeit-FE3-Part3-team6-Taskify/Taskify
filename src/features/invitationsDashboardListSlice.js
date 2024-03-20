import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  invitations: [],
};

export const invitationsDashboardList = createSlice({
  name: 'invitationsDashboardList',
  initialState: initialValue,
  reducers: {
    setInvitations: (state, action) => {
      const { invitations } = action.payload;
      state.invitations = invitations;
    },
    addInvitations: (state, action) => {
      const { newInvitations } = action.payload;
      state.invitations = [...state.invitations, ...newInvitations];
    },
  },
});

export const { setInvitations, addInvitations } =
  invitationsDashboardList.actions;
