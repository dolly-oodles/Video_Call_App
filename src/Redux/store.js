// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from "./Reducers/meetingSlice.js";
import { CRUD_APIReducer } from "../Redux/Reducers/CRUD_API.reducers.jsx";

export const store = configureStore({
  reducer: {
    meeting: meetingReducer,
    CRUD_API: CRUD_APIReducer,
  },
});
