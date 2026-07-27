import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  configureStore,
} from '@reduxjs/toolkit';
import {
  Provider,
} from 'react-redux';

import Login from './Login';
import authReducer from
  '../../features/auth/authSlice.js';

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
  });

const renderWithStore = (
  store = createTestStore(),
) => {
  const result = render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );

  return {
    store,
    ...result,
  };
};

describe('Login component tests', () => {
  test('renders the login form with email, password, and submit fields', () => {
    const { container } =
      renderWithStore();

    const labels =
      container.querySelectorAll('label');

    const inputs =
      container.querySelectorAll('input');

    expect(labels).toHaveLength(2);
    expect(inputs).toHaveLength(3);

    expect(
      screen.getByLabelText(/email/i),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeInTheDocument();
  });

  test('focuses the corresponding input when each label is clicked', async () => {
    const user = userEvent.setup();

    renderWithStore();

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    const emailLabel =
      screen.getByText(/^email$/i);

    const passwordLabel =
      screen.getByText(/^password$/i);

    await user.click(emailLabel);

    expect(emailInput).toHaveFocus();

    await user.click(passwordLabel);

    expect(passwordInput).toHaveFocus();
  });

  test('submit input is disabled by default', () => {
    renderWithStore();

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();
  });

  test('submit input stays disabled with an invalid email', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'invalid-email',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();
  });

  test('submit input stays disabled with a password shorter than 8 characters', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'pass123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();
  });

  test('submit input becomes enabled when the email and password are valid', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeEnabled();
  });

  test('sets isLoggedIn to true after submitting valid credentials', async () => {
    const user = userEvent.setup();

    const {
      store,
    } = renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'student@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    await user.click(
      screen.getByDisplayValue('OK'),
    );

    const authState =
      store.getState().auth;

    expect(
      authState.isLoggedIn,
    ).toBe(true);

    expect(
      authState.user,
    ).toEqual({
      email: 'student@example.com',
      password: 'password123',
    });
  });

  test('keeps isLoggedIn false when credentials are invalid', async () => {
    const user = userEvent.setup();

    const {
      store,
    } = renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'invalid-email',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    expect(
      screen.getByDisplayValue('OK'),
    ).toBeDisabled();

    const authState =
      store.getState().auth;

    expect(
      authState.isLoggedIn,
    ).toBe(false);

    expect(
      authState.user,
    ).toEqual({
      email: '',
      password: '',
    });
  });
});
