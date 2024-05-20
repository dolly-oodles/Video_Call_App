// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import meetingReducer from './Reducers/meetingSlice';
import { loadState, saveState } from '../utils/localStorage'; // Import utility functions

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    meeting: meetingReducer,
  },
  // preloadedState: preloadedState,
});

// store.subscribe(() => {
//   saveState(store.getState().meeting);
// });
