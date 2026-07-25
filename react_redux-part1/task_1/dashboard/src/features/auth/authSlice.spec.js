import authReducer, {
  initialState,
  login,
  logout,
} from '../auth/authSlice';

describe('authSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(
      authReducer(undefined, {
        type: undefined,
      }),
    ).toEqual(initialState);
  });

  test('updates the state when login is dispatched', () => {
    const credentials = {
      email: 'student@example.com',
      password: 'password123',
    };

    const state = authReducer(
      initialState,
      login(credentials),
    );

    expect(state).toEqual({
      user: {
        email: 'student@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
    });
  });

  test('resets the state when logout is dispatched', () => {
    const loggedInState = {
      user: {
        email: 'student@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
    };

    const state = authReducer(
      loggedInState,
      logout(),
    );

    expect(state).toEqual(initialState);
  });
});
