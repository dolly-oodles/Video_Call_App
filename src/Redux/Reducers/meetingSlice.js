// src/Redux/Reducers/meetingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetingRoom: [
    { id: "kwgy1292ewjbwdh20987bsn", title: "room1" },
    { id: "nqbjs28176e5218xsajzx", title: "room2" },
    { id: "jashgdaishd625612gwsxsah", title: "room3" },
    { id: "nzjhxd5253127xshsxsc6732bhk", title: "room4" },
  ],
  requests: [],
  approvedRequests: [],
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    createMeeting: (state, action) => {
      state.meetingRoom.push(action.payload);
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    approveRequest: (state, action) => {
      state.requests = state.requests.filter(request => request.id !== action.payload.requestId);
      state.approvedRequests.push(action.payload.requestId);
    },
    denyRequest: (state, action) => {
      state.requests = state.requests.filter(request => request.id !== action.payload.requestId);
    },
  },
});

export const { createMeeting, addRequest, approveRequest, denyRequest } = meetingSlice.actions;
export const selectMeeting = (state) => state.meeting;

export default meetingSlice.reducer;
