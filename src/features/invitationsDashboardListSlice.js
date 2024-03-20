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
    removeInvitations: (state, action) => {
      const { id } = action.payload;
      state.invitations = state.invitations.filter(
        (invitation) => invitation.id !== id,
      );
    },
  },
});

export const { setInvitations, addInvitations, removeInvitations } =
  invitationsDashboardList.actions;
