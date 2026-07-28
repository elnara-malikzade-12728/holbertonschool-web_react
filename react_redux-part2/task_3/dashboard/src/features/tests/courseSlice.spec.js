import {
  configureStore,
} from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';

import {
  logout,
} from '../auth/authSlice.js';
import coursesReducer, {
  ENDPOINTS,
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../courses/courseSlice.js';

describe('coursesSlice', () => {
  const expectedInitialState = {
    courses: [],
  };

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test(
    'returns the correct initial state by default',
    () => {
      const state = coursesReducer(
        undefined,
        {
          type: 'unknown',
        },
      );

      expect(state).toEqual(
        expectedInitialState,
      );
    },
  );

  test(
    'fetches the courses data correctly',
    async () => {
      const store = configureStore({
        reducer: coursesReducer,
      });

      const mockCourses = [
        {
          id: 1,
          name: 'ES6',
          credit: 60,
        },
        {
          id: 2,
          name: 'Webpack',
          credit: 20,
        },
        {
          id: 3,
          name: 'React',
          credit: 40,
        },
      ];

      const request = store.dispatch(
        fetchCourses(),
      );

      expect(
        mockAxios.get,
      ).toHaveBeenCalledWith(
        ENDPOINTS.courses,
      );

      mockAxios.mockResponse({
        data: mockCourses,
      });

      await request;

      expect(
        store.getState(),
      ).toEqual({
        courses: mockCourses.map(
          (course) => ({
            ...course,
            isSelected: false,
          }),
        ),
      });
    },
  );

  test(
    'selects a course',
    () => {
      const previousState = {
        courses: [
          {
            id: 1,
            name: 'ES6',
            credit: 60,
            isSelected: false,
          },
        ],
      };

      const state = coursesReducer(
        previousState,
        selectCourse(1),
      );

      expect(
        state.courses[0].isSelected,
      ).toBe(true);
    },
  );

  test(
    'unselects a course',
    () => {
      const previousState = {
        courses: [
          {
            id: 1,
            name: 'ES6',
            credit: 60,
            isSelected: true,
          },
        ],
      };

      const state = coursesReducer(
        previousState,
        unSelectCourse(1),
      );

      expect(
        state.courses[0].isSelected,
      ).toBe(false);
    },
  );

  test(
    'resets courses when logout is dispatched',
    () => {
      const populatedState = {
        courses: [
          {
            id: 1,
            name: 'ES6',
            credit: 60,
            isSelected: true,
          },
        ],
      };

      const state = coursesReducer(
        populatedState,
        logout(),
      );

      expect(state).toEqual({
        courses: [],
      });
    },
  );
});
