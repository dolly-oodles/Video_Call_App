// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import meetingReducer from './Reducers/meetingSlice';
import { CRUD_APIReducer } from './Reducers/CRUD_API.reducers';

export const store = configureStore({
  reducer: {
    meeting: meetingReducer,
    CRUD_API: CRUD_APIReducer,
  },
});


