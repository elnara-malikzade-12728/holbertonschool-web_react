import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  configureStore,
} from '@reduxjs/toolkit';
import {
  Provider,
} from 'react-redux';
import mockAxios from 'jest-mock-axios';

import CourseList from './CourseList';
import coursesReducer, {
  fetchCourses,
} from '../../features/courses/courseSlice.js';
import authReducer, {
  logout,
} from '../../features/auth/authSlice.js';

const courses = [
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

const createTestStore = ({
  courseList = [],
  isLoggedIn = true,
} = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      courses: coursesReducer,
    },

    preloadedState: {
      auth: {
        user: {
          email: isLoggedIn
            ? 'student@example.com'
            : '',
          password: isLoggedIn
            ? 'password123'
            : '',
        },
        isLoggedIn,
      },

      courses: {
        courses: courseList,
      },
    },
  });

const renderWithStore = (
  store = createTestStore(),
) => {
  const result = render(
    <Provider store={store}>
      <CourseList />
    </Provider>,
  );

  return {
    store,
    ...result,
  };
};

describe('CourseList component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('renders five rows when courses exist in Redux', () => {
    const store = createTestStore({
      courseList: courses,
    });

    renderWithStore(store);

    expect(
      screen.getAllByRole('row'),
    ).toHaveLength(5);

    expect(
      screen.getByText('ES6'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Webpack'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('React'),
    ).toBeInTheDocument();
  });

  test('renders an empty-list row when no courses exist', () => {
    renderWithStore();

    expect(
      screen.getAllByRole('row'),
    ).toHaveLength(1);

    expect(
      screen.getByText(
        /no course available yet/i,
      ),
    ).toBeInTheDocument();
  });

  test('displays courses returned by fetchCourses', async () => {
    const store = createTestStore();

    store.dispatch(fetchCourses());

    expect(
      mockAxios.get,
    ).toHaveBeenCalledWith(
      '/courses.json',
    );

    await act(async () => {
      mockAxios.mockResponseFor(
        {
          url: '/courses.json',
        },
        {
          data: courses,
        },
      );
    });

    renderWithStore(store);

    expect(
      await screen.findByText('ES6'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Webpack'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('React'),
    ).toBeInTheDocument();
  });

  test('clears courses after logout', async () => {
    const store = createTestStore({
      courseList: courses,
    });

    renderWithStore(store);

    expect(
      screen.getByText('ES6'),
    ).toBeInTheDocument();

    act(() => {
      store.dispatch(logout());
    });

    await waitFor(() => {
      expect(
        screen.queryByText('ES6'),
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(
        /no course available yet/i,
      ),
    ).toBeInTheDocument();

    expect(
      store.getState().courses.courses,
    ).toEqual([]);
  });
});
