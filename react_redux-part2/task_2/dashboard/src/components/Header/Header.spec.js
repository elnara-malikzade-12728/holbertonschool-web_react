import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import {
  configureStore,
} from '@reduxjs/toolkit';
import {
  Provider,
} from 'react-redux';

import Header from './Header';
import authReducer, {
  login,
} from '../../features/auth/authSlice.js';

const createTestStore = ({
  isLoggedIn = false,
  email = '',
  password = '',
} = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },

    preloadedState: {
      auth: {
        user: {
          email,
          password,
        },
        isLoggedIn,
      },
    },
  });

const renderWithStore = (
  store = createTestStore(),
) => {
  const result = render(
    <Provider store={store}>
      <Header />
    </Provider>,
  );

  return {
    store,
    ...result,
  };
};

describe('Header component', () => {
  test('renders without crashing', () => {
    renderWithStore();
  });

  test('renders the logo', () => {
    renderWithStore();

    expect(
      screen.getByAltText(
        /holberton logo/i,
      ),
    ).toBeInTheDocument();
  });

  test('renders the title', () => {
    renderWithStore();

    expect(
      screen.getByRole('heading', {
        name: /school dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  test('does not display logout section when user is logged out', () => {
    renderWithStore(
      createTestStore({
        isLoggedIn: false,
      }),
    );

    expect(
      document.querySelector(
        '#logoutSection',
      ),
    ).not.toBeInTheDocument();
  });

  test('displays logout link when user is logged in', () => {
    renderWithStore(
      createTestStore({
        isLoggedIn: true,
        email: 'student@example.com',
        password: 'password123',
      }),
    );

    expect(
      document.querySelector(
        '#logoutSection',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/welcome/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /\(logout\)/i,
      ),
    ).toBeInTheDocument();
  });

  test('displays the email after login is dispatched', () => {
    const store = createTestStore();

    store.dispatch(
      login({
        email: 'student@example.com',
        password: 'password123',
      }),
    );

    renderWithStore(store);

    expect(
      screen.getByText(
        /student@example\.com/i,
      ),
    ).toBeInTheDocument();

    expect(
      store.getState().auth.isLoggedIn,
    ).toBe(true);
  });

  test('sets isLoggedIn to false when logout is clicked', () => {
    const store = createTestStore({
      isLoggedIn: true,
      email: 'student@example.com',
      password: 'password123',
    });

    renderWithStore(store);

    fireEvent.click(
      screen.getByText(
        /\(logout\)/i,
      ),
    );

    expect(
      store.getState().auth.isLoggedIn,
    ).toBe(false);

    expect(
      store.getState().auth.user,
    ).toEqual({
      email: '',
      password: '',
    });

    expect(
      document.querySelector(
        '#logoutSection',
      ),
    ).not.toBeInTheDocument();
  });
});
