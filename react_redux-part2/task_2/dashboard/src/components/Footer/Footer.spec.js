import {
  render,
  screen,
} from '@testing-library/react';
import {
  configureStore,
} from '@reduxjs/toolkit';
import {
  Provider,
} from 'react-redux';

import Footer from './Footer';
import authReducer from
  '../../features/auth/authSlice.js';

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
) =>
  render(
    <Provider store={store}>
      <Footer />
    </Provider>,
  );

describe('Footer component tests', () => {
  test('renders Footer without crashing', () => {
    renderWithStore();
  });

  test('renders the correct copyright text', () => {
    renderWithStore();

    const currentYear =
      new Date().getFullYear();

    expect(
      screen.getByText(
        new RegExp(
          `Copyright ${currentYear} - Holberton School`,
          'i',
        ),
      ),
    ).toBeInTheDocument();
  });

  test('does not display Contact us when user is logged out', () => {
    renderWithStore(
      createTestStore({
        isLoggedIn: false,
      }),
    );

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      }),
    ).not.toBeInTheDocument();
  });

  test('displays Contact us when user is logged in', () => {
    renderWithStore(
      createTestStore({
        isLoggedIn: true,
        email: 'student@example.com',
        password: 'password123',
      }),
    );

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      }),
    ).toBeInTheDocument();
  });
});
