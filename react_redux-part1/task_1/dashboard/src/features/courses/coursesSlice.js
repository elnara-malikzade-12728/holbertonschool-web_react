import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import {
  logout,
} from '../auth/authSlice.js';

export const API_BASE_URL =
  'http://localhost:5173';

export const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

export const initialState = {
  courses: [],
};

export const fetchCourses =
  createAsyncThunk(
    'courses/fetchCourses',
    async () => {
      const response = await axios.get(
        ENDPOINTS.courses,
      );

      return (
        response.data?.courses ??
        response.data
      );
    },
  );

const coursesSlice = createSlice({
  name: 'courses',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCourses.fulfilled,
        (state, action) => {
          state.courses =
            action.payload;
        },
      )
      .addCase(
        logout,
        () => initialState,
      );
  },
});

export default coursesSlice.reducer;
