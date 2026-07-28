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

import App from '../App';
import authReducer from
  '../features/auth/authSlice.js';
import coursesReducer from
  '../features/courses/courseSlice.js';
import notificationsReducer from
  '../features/notifications/notificationsSlice.js';

const notificationsData = [
  {
    id: 1,
    context: {
      type: 'default',
      isRead: false,
      value:
        'New course available',
    },
  },
  {
    id: 2,
    context: {
      type: 'urgent',
      isRead: false,
      value:
        'New resume available',
    },
  },
  {
    id: 3,
    context: {
      type: 'urgent',
      isRead: true,
      value:
        'Latest notification',
    },
  },
];

const coursesData = [
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
  isLoggedIn = false,
  user = {
    email: '',
    password: '',
  },
  notifications = [],
  courses = [],
} = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      notifications:
        notificationsReducer,
      courses: coursesReducer,
    },

    preloadedState: {
      auth: {
        user,
        isLoggedIn,
      },

      notifications: {
        notifications,
        loading: false,
      },

      courses: {
        courses,
        loading: false,
      },
    },
  });

const renderWithStore = (
  store = createTestStore(),
) => {
  const result = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  return {
    store,
    ...result,
  };
};

describe('App component', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test(
    'renders Login when the user is not logged in',
    () => {
      const store = createTestStore({
        isLoggedIn: false,
      });

      renderWithStore(store);

      expect(
        screen.getByText(
          /login to access the full dashboard/i,
        ),
      ).toBeInTheDocument();

      expect(
        screen.queryByText('ES6'),
      ).not.toBeInTheDocument();
    },
  );

  test(
    'renders CourseList when the user is logged in',
    () => {
      const store = createTestStore({
        isLoggedIn: true,

        user: {
          email:
            'student@example.com',
          password:
            'password123',
        },

        courses: coursesData,
      });

      renderWithStore(store);

      expect(
        screen.getByText('ES6'),
      ).toBeInTheDocument();

      expect(
        screen.getByText('Webpack'),
      ).toBeInTheDocument();

      expect(
        screen.getByText('React'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          /login to access the full dashboard/i,
        ),
      ).not.toBeInTheDocument();
    },
  );

  test(
    'fetches notifications when App mounts',
    async () => {
      renderWithStore();

      await waitFor(() => {
        expect(
          mockAxios.get,
        ).toHaveBeenCalledWith(
          '/notifications.json',
        );
      });

      await act(async () => {
        mockAxios.mockResponseFor(
          {
            url:
              '/notifications.json',
          },
          {
            data:
              notificationsData,
          },
        );
      });

      expect(
        await screen.findByText(
          /new course available/i,
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /new resume available/i,
        ),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          /latest notification/i,
        ),
      ).not.toBeInTheDocument();
    },
  );

  test(
    'does not fetch courses when the user is logged out',
    async () => {
      const store = createTestStore({
        isLoggedIn: false,
      });

      renderWithStore(store);

      await waitFor(() => {
        expect(
          mockAxios.get,
        ).toHaveBeenCalledWith(
          '/notifications.json',
        );
      });

      expect(
        mockAxios.get,
      ).not.toHaveBeenCalledWith(
        '/courses.json',
      );
    },
  );

  test(
    'fetches courses when the user is logged in',
    async () => {
      const store = createTestStore({
        isLoggedIn: true,

        user: {
          email:
            'student@example.com',
          password:
            'password123',
        },
      });

      renderWithStore(store);

      await waitFor(() => {
        expect(
          mockAxios.get,
        ).toHaveBeenCalledWith(
          '/courses.json',
        );
      });

      await act(async () => {
        mockAxios.mockResponseFor(
          {
            url:
              '/courses.json',
          },
          {
            data: coursesData,
          },
        );
      });

      expect(
        await screen.findByText(
          'ES6',
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          'Webpack',
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          'React',
        ),
      ).toBeInTheDocument();
    },
  );
});
