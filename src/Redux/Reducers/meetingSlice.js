// src/reducers/meetingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetingRoom: [],
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState: initialState,
  reducers: {
    createMeeting: (state, action) => {
      state.meetingRoom.push(action.payload);
    },
  },
});

export const { createMeeting } = meetingSlice.actions;
export const selectMeeting = (state) => state.meeting.meetingRoom;
export default meetingSlice.reducer;
