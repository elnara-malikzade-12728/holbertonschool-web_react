import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import {
  logout,
} from '../auth/authSlice.js';

export const ENDPOINTS = {
  courses: '/courses.json',
};

export const initialState = {
  courses: [],
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get(
      ENDPOINTS.courses,
    );

    return (
      response.data?.courses
      ?? response.data
      ?? []
    );
  },
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,

  reducers: {
    selectCourse: (state, action) => {
      const course = state.courses.find(
        (item) =>
          item.id === action.payload,
      );

      if (course) {
        course.isSelected = true;
      }
    },

    unSelectCourse: (state, action) => {
      const course = state.courses.find(
        (item) =>
          item.id === action.payload,
      );

      if (course) {
        course.isSelected = false;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCourses.fulfilled,
        (state, action) => {
          const courses = Array.isArray(
            action.payload,
          )
            ? action.payload
            : [];

          state.courses = courses.map(
            (course) => ({
              ...course,
              isSelected: false,
            }),
          );
        },
      )
      .addCase(
        logout,
        () => initialState,
      );
  },
});

export const {
  selectCourse,
  unSelectCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
